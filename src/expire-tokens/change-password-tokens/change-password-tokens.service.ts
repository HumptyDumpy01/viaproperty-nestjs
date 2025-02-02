import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChangePasswordTokenInput } from './dto/create-change-password-token.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordTokens } from './change-password-tokens.entity';
import { v4 as uuid } from 'uuid';
import { authenticator } from 'otplib';
import { AuthService } from '../../auth/auth.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { calcTimeBeforeExpires } from '../../../utils/functions/calcTimeBeforeExpires';
import { ValidateTokenInput } from './dto/validate-token.input';
import { SendgridMailService } from '../../sendgrid-mail/sendgrid-mail.service';
import { TOKEN_EXPIRES_AFTER_MINUTES } from '../../../utils/variables/variables';
import { getChangePasswordTokenMailConfig } from './utils/getChangePasswordTokenMailHTML';

@Injectable()
export class ChangePasswordTokensService {
  constructor(
    @InjectRepository(ChangePasswordTokens)
    private changePasswordTokensRepository: Repository<ChangePasswordTokens>,
    private sandGridMailService: SendgridMailService,
    private authService: AuthService,
  ) {}

  async create(createChangePasswordTokenInput: CreateChangePasswordTokenInput) {
    const { email } = createChangePasswordTokenInput;

    await this.authService.getUserByEmail(email);

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

    const newToken = {
      id: uuid(),
      email: hashedEmail,
      data: encryptedToken,
      createdAt: new Date(),
    };
    const generatedChangePasswordToken =
      this.changePasswordTokensRepository.create(newToken);

    const sendGridResponseSuccess = await this.sandGridMailService.sendMail(
      getChangePasswordTokenMailConfig(token),
    );

    if (!sendGridResponseSuccess) {
      throw new InternalServerErrorException(
        `Failed to send an email. Please try again later.`,
      );
    }

    const savedPasswordToken = await this.changePasswordTokensRepository.save(
      generatedChangePasswordToken,
    );

    return savedPasswordToken;
  }

  async findOneByHashedEmail(hashedEmail: string) {
    return await this.changePasswordTokensRepository.findOne({
      where: { email: hashedEmail },
    });
  }

  async validateToken(validateTokenInput: ValidateTokenInput) {
    const { token, email } = validateTokenInput;

    await this.authService.getUserByEmail(email);

    const hashedEmail = crypto.createHash(`sha256`).update(email).digest(`hex`);
    const existingToken = await this.findOneByHashedEmail(hashedEmail);

    if (!existingToken) {
      throw new NotFoundException('The token has expired or not exists.');
    }
    const tokenIsValid = await bcrypt.compare(
      token.toString(),
      existingToken.data,
    );
    return { tokenIsValid };
  }

  async remove(id: string) {
    return await this.changePasswordTokensRepository.delete(id);
  }
}
