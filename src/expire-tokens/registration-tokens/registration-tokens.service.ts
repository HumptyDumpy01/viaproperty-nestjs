import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRegistrationTokenInput } from './dto/create-registration-token.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationTokens } from './registration-tokens.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { TOKEN_EXPIRES_AFTER_MINUTES } from '../../../utils/variables/variables';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { authenticator } from 'otplib';
import { calcTimeBeforeExpires } from '../../../utils/functions/calcTimeBeforeExpires';
import { v4 as uuid } from 'uuid';
import { ValidateRegistrationTokenInput } from './dto/validate-registration-token.input';
import { SendgridMailService } from '../../sendgrid-mail/sendgrid-mail.service';
import { confirmRegistrationHTML } from './utils/confirmEmailHTML';

@Injectable()
export class RegistrationTokensService {
  constructor(
    @InjectRepository(RegistrationTokens)
    private registerTokensRepository: Repository<RegistrationTokens>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private sendGridMailService: SendgridMailService,
  ) {}

  async create(createRegistrationTokenInput: CreateRegistrationTokenInput) {
    const { email } = createRegistrationTokenInput;

    const user = await this.authService.getUserByEmail(email, false);

    if (user) {
      throw new InternalServerErrorException(`The email is already in use.`);
    }

    const hashedEmail = crypto.createHash(`sha256`).update(email).digest(`hex`);

    const existingToken = await this.findOneByHashedEmail(hashedEmail);

    if (existingToken && existingToken.createdAt) {
      const { minutes, seconds, dateOfIssue } = calcTimeBeforeExpires(
        existingToken.createdAt,
        // 10 because the newly created token only lasts for 10 minutes and then expires.
        TOKEN_EXPIRES_AFTER_MINUTES,
      );

      throw new InternalServerErrorException(
        `Please wait ${minutes} minutes ${seconds} seconds to request a new token(${dateOfIssue})`,
      );
    }

    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);

    const encryptedToken = await bcrypt.hash(token, 12);

    const newRegistrationToken = {
      id: uuid(),
      email: hashedEmail,
      data: encryptedToken,
      createdAt: new Date(),
    };

    const createdToken =
      this.registerTokensRepository.create(newRegistrationToken);

    const savedRegistrationToken =
      await this.registerTokensRepository.save(createdToken);

    const response = await this.sendGridMailService.sendMail(
      confirmRegistrationHTML(token, email),
    );

    if (!response) {
      await this.deleteRegistrationToken(savedRegistrationToken.id);
      throw new InternalServerErrorException(
        'Failed to send an email. Please try again later..',
      );
    }

    return { sent: !!savedRegistrationToken._id };
  }

  async findOneByHashedEmail(hashedEmail: string) {
    return await this.registerTokensRepository.findOne({
      where: { email: hashedEmail },
    });
  }

  async validateRegistrationToken(
    validateRegistrationTokenInput: ValidateRegistrationTokenInput,
  ) {
    const { token, email } = validateRegistrationTokenInput;

    const hashedEmail = crypto.createHash(`sha256`).update(email).digest(`hex`);
    const registrationToken = await this.findOneByHashedEmail(hashedEmail);

    if (!registrationToken) {
      throw new InternalServerErrorException(
        'The token is incorrect or expired.',
      );
    }

    const successfulTokenComparison = await bcrypt.compare(
      token,
      registrationToken.data,
    );

    if (!successfulTokenComparison) {
      throw new InternalServerErrorException(
        'The token is incorrect or expired.',
      );
    }
    await this.deleteRegistrationToken(registrationToken.id);

    return successfulTokenComparison;
  }

  deleteRegistrationToken(id: string) {
    return this.registerTokensRepository.delete({ id });
  }
}
