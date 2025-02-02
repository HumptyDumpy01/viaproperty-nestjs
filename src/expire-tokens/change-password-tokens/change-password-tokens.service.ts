import { Injectable } from '@nestjs/common';
import { CreateChangePasswordTokenInput } from './dto/create-change-password-token.input';
import { UpdateChangePasswordTokenInput } from './dto/update-change-password-token.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordTokens } from './change-password-tokens.entity';

@Injectable()
export class ChangePasswordTokensService {
  constructor(
    @InjectRepository(ChangePasswordTokens)
    private changePasswordTokensRepository: Repository<ChangePasswordTokens>,
  ) {}

  create(createChangePasswordTokenInput: CreateChangePasswordTokenInput) {
    return 'This action adds a new changePasswordToken';
  }

  findOne(id: number) {
    return `This action returns a #${id} changePasswordToken`;
  }

  update(
    id: number,
    updateChangePasswordTokenInput: UpdateChangePasswordTokenInput,
  ) {
    return `This action updates a #${id} changePasswordToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} changePasswordToken`;
  }
}
