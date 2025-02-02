import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private propertyService: PropertyService,
  ) {}

  async getUserData(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(
    userInput: UserInput,
    confirmPassword: string,
  ): Promise<User> {
    const { email, initials, password } = userInput;

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
      authMethod: AuthMethodEnum.PASSWORD,
      createdAt: new Date().toISOString(),
      online: false,
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
    await this.userRepository.save(newUser);
    return newUser;
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
    if (user.initials === updatedInitials) {
      throw new BadRequestException(
        showErrorMessage(
          'updatedInitials are the same as current user initials.',
        ),
      );
    }

    user.initials = updatedInitials;

    const updatedUser = await this.userRepository.save(user);
    const { accessToken } = await this.login(updatedUser);

    return { initials: updatedUser.initials, accessToken };
  }
}
