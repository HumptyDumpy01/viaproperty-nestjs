import { forwardRef, Module } from '@nestjs/common';
import { RegistrationTokensService } from './registration-tokens.service';
import { RegistrationTokensResolver } from './registration-tokens.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationTokens } from './registration-tokens.entity';
import { AuthModule } from '../../auth/auth.module';
import { SendgridMailModule } from '../../sendgrid-mail/sendgrid-mail.module';

@Module({
  providers: [RegistrationTokensResolver, RegistrationTokensService],
  imports: [
    TypeOrmModule.forFeature([RegistrationTokens]),
    forwardRef(() => AuthModule),
    SendgridMailModule,
  ],
  exports: [RegistrationTokensService],
})
export class RegistrationTokensModule {}
