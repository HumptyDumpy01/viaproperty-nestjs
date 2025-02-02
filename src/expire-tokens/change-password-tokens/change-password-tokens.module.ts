import { Module } from '@nestjs/common';
import { ChangePasswordTokensService } from './change-password-tokens.service';
import { ChangePasswordTokensResolver } from './change-password-tokens.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangePasswordTokens } from './change-password-tokens.entity';
import { AuthModule } from '../../auth/auth.module';
import { SendgridMailModule } from '../../sendgrid-mail/sendgrid-mail.module';

@Module({
  providers: [ChangePasswordTokensResolver, ChangePasswordTokensService],
  imports: [
    TypeOrmModule.forFeature([ChangePasswordTokens]),
    AuthModule,
    SendgridMailModule,
  ],
})
export class ChangePasswordTokensModule {}
