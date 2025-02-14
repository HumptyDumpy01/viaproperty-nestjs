import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

@Injectable()
export class RegistrationTokensService {
  constructor(
    @InjectRepository(RegistrationTokens)
    private registerTokensRepository: Repository<RegistrationTokens>,
    private authService: AuthService,
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

    return { sent: true };
  }

  async findOneByHashedEmail(hashedEmail: string) {
    return await this.registerTokensRepository.findOne({
      where: { email: hashedEmail },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} registrationToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} registrationToken`;
  }
}
