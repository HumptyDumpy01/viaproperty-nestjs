import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

@Injectable()
export class ChangePasswordTokensService {
  constructor(
    @InjectRepository(ChangePasswordTokens)
    private changePasswordTokensRepository: Repository<ChangePasswordTokens>,
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
        // 5 because the newly created token only lasts for 5 minutes and then expires.
        5,
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

    return await this.changePasswordTokensRepository.save(
      generatedChangePasswordToken,
    );
  }

  async findOneByHashedEmail(hashedEmail: string) {
    return await this.changePasswordTokensRepository.findOne({
      where: { email: hashedEmail },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} changePasswordToken`;
  }
}
