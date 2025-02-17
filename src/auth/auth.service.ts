import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserInput } from './user.input';
import { AuthMethodEnum } from './enums/auth-method.enum';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from './enums/user-status.enum';
import { v4 as uuid } from 'uuid';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { showErrorMessage } from '../../utils/functions/showErrorMessage';
import { PropertyService } from '../property/property.service';
import { UpdateUserPasswordInput } from './inputs/update-user-password.input';
import { ChangePasswordTokensService } from '../expire-tokens/change-password-tokens/change-password-tokens.service';
import { SendgridMailService } from '../sendgrid-mail/sendgrid-mail.service';
import { sendGridSuccessfulPasswordResetConfig } from './utils/sendGridSuccessfulPasswordResetConfig';
import { ChangeUserAuthMethodInput } from './inputs/change-user-auth-method.input';
import { RegistrationTokensService } from '../expire-tokens/registration-tokens/registration-tokens.service';
import { sendGridSuccessfulRegistrationConfig } from './utils/sendGridSuccessfulRegistrationConfig';
import { UserAuthType } from './google-auth.controller';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private propertyService: PropertyService,
    private changePasswordTokensService: ChangePasswordTokensService,
    private sendGridMailService: SendgridMailService,
    private registrationTokensService: RegistrationTokensService,
  ) {}

  async getUserData(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string, throwErrorIfNone = true): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user && throwErrorIfNone) {
      throw new NotFoundException(
        showErrorMessage(`User  with is ${email} not found!`),
      );
    }

    return user;
  }

  async createUser(userInput: UserInput): Promise<{ accessToken: string }> {
    const {
      email,
      initials,
      password,
      confirmPassword,
      authMethod,
      verificationToken,
    } = userInput;

    const validate =
      await this.registrationTokensService.validateRegistrationToken({
        token: verificationToken,
        email,
      });

    if (!validate) {
      throw new InternalServerErrorException(`Validation token has expired.`);
    }

    if (password !== confirmPassword) {
      throw new NotAcceptableException(`Passwords do not match`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      id: uuid(),
      email,
      initials,
      password: hashedPassword,
      bio: '',
      status: UserStatusEnum.USER,
      authMethod,
      createdAt: new Date().toISOString(),
      online: true,
      adverts: [],
      wishlist: [],
      purchases: [],
      active: true,
      balance: { total: 0 },
      pendingRequests: [],
      rejectedRequests: [],
      completedDeals: [],
      favoriteChats: [],
      blockedUsers: [],
      activity: [],
    };

    const newUser = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(newUser);

    await this.sendGridMailService.sendMail(
      sendGridSuccessfulRegistrationConfig(email),
    );

    const { accessToken } = await this.login(savedUser);

    return { accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ where: { id: payload.id } });
  }

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotAcceptableException(`Invalid Credentials`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotAcceptableException(`Invalid Credentials`);
    }

    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      initials: user.initials,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async loginViaGoogle(user: UserAuthType) {
    const { email, firstName, lastName } = user;
    const userData = await this.getUserByEmail(email, false);

    if (!userData) {
      const userData = {
        id: uuid(),
        email,
        initials: `${firstName} ${lastName}`,
        password: null,
        bio: '',
        status: UserStatusEnum.USER,
        authMethod: AuthMethodEnum.GOOGLE_PROVIDER,
        createdAt: new Date().toISOString(),
        online: true,
        adverts: [],
        wishlist: [],
        purchases: [],
        active: true,
        balance: { total: 0 },
        pendingRequests: [],
        rejectedRequests: [],
        completedDeals: [],
        favoriteChats: [],
        blockedUsers: [],
        activity: [],
      };

      const newUser = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(newUser);

      await this.sendGridMailService.sendMail(
        sendGridSuccessfulRegistrationConfig(email),
      );

      const { accessToken } = await this.login(savedUser);

      return { accessToken, error: false };
    }
    if (userData && userData.authMethod !== `google-provider`) {
      return { error: `Email is already in use.` };
    }

    const accessToken = await this.login(userData);
    return { accessToken: accessToken.accessToken, error: false };
  }

  async addPropertyIdToUserWishlist(propertyId: string, userId: string) {
    // if not found, it returns an error
    await this.propertyService.getProperty(propertyId);

    const user = await this.getUserData(userId);
    const userWishlist = user.wishlist;

    if (userWishlist.includes(propertyId)) {
      throw new BadRequestException(
        showErrorMessage('User already have this property wishlisted.'),
      );
    }

    userWishlist.unshift(propertyId);
    user.wishlist = userWishlist;
    await this.userRepository.save(user);
    return userWishlist;
  }

  async removePropertyIdFromUserWishlist(propertyId: string, userId: string) {
    // if not found, it returns an error
    await this.propertyService.getProperty(propertyId);

    const user = await this.getUserData(userId);
    let userWishlist = user.wishlist;

    if (!userWishlist.includes(propertyId)) {
      throw new BadRequestException(
        showErrorMessage('This property ID is not present in user wishlist.'),
      );
    }

    userWishlist = userWishlist.filter((propId) => propId !== propertyId);
    user.wishlist = userWishlist;
    await this.userRepository.save(user);
    return userWishlist;
  }

  async getUserWishlist(userId: string) {
    const user = await this.getUserData(userId);

    return user.wishlist;
  }

  async changeUserInitials(userId: string, updatedInitials: string) {
    const user = await this.getUserData(userId);

    if (
      user.initials === updatedInitials ||
      updatedInitials.trim().length < 2 ||
      updatedInitials.trim().length > 100
    ) {
      throw new BadRequestException(
        showErrorMessage('Incorrect format to update user initials.'),
      );
    }

    user.initials = updatedInitials;

    const updatedUser = await this.userRepository.save(user);
    const { accessToken } = await this.login(updatedUser);

    return { initials: updatedUser.initials, accessToken };
  }

  /**
   * to update the password, user should confirm him identity via
   * entering the token sent to his email inbox, and then once more to
   * confirm his new password, the token is checked on expiration date
   * and validity.
   */
  async updateUserPassword(updateUserPasswordInput: UpdateUserPasswordInput) {
    const { userEmail, password, confirmPassword, token } =
      updateUserPasswordInput;

    // the token is validated once more, ensuring that the user
    // is the one he claims to be.
    const {
      tokenIsValid,
      userEmail: validEmail,
      id: tokenId,
    } = await this.changePasswordTokensService.validateToken({
      email: userEmail,
      token,
    });

    if (tokenIsValid) {
      const user = await this.getUserByEmail(validEmail);

      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match.');
      }
      const encryptedNewPassword = await bcrypt.hash(password, 12);

      user.password = encryptedNewPassword;

      await this.changePasswordTokensService.deleteToken(tokenId);

      // sending a message about the activity.
      await this.sendGridMailService.sendMail(
        sendGridSuccessfulPasswordResetConfig(),
      );

      return await this.userRepository.save(user);
    } else {
      throw new PreconditionFailedException(
        'The token has expired or corrupted.',
      );
    }
  }

  async getUserAuthMethod(email: string) {
    const user = await this.getUserByEmail(email);

    return user.authMethod;
  }

  async changeUserAuthMethod(
    changeUserAuthMethodInput: ChangeUserAuthMethodInput,
    email: string,
  ) {
    const { authMethod } = changeUserAuthMethodInput;

    const user = await this.getUserByEmail(email);

    if (authMethod === AuthMethodEnum.GOOGLE_PROVIDER) {
      throw new NotAcceptableException(
        showErrorMessage(
          'User cannot switch to google provider auth method manually.',
        ),
      );
    }

    if (user.authMethod === authMethod) {
      throw new NotAcceptableException(
        showErrorMessage(
          'Failed to change auth method because user already have the same method defined.',
        ),
      );
    }
    user.authMethod = authMethod as AuthMethodEnum;

    const savedNewData = await this.userRepository.save(user);
    return { authMethod: savedNewData.authMethod };
  }
}
