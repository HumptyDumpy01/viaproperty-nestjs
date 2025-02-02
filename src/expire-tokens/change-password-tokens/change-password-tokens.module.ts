import { Module } from '@nestjs/common';
import { ChangePasswordTokensService } from './change-password-tokens.service';
import { ChangePasswordTokensResolver } from './change-password-tokens.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangePasswordTokens } from './change-password-tokens.entity';

@Module({
  providers: [ChangePasswordTokensResolver, ChangePasswordTokensService],
  imports: [TypeOrmModule.forFeature([ChangePasswordTokens])],
})
export class ChangePasswordTokensModule {}
