import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtStrategy } from './jwt.strategy';
import { configDotenv } from 'dotenv';
import { PropertyModule } from '../property/property.module';
import { ChangePasswordTokensModule } from '../expire-tokens/change-password-tokens/change-password-tokens.module';
import { SendgridMailModule } from '../sendgrid-mail/sendgrid-mail.module';
import { RegistrationTokensModule } from '../expire-tokens/registration-tokens/registration-tokens.module';

configDotenv({
  path: `${__dirname}/../../../config.env`,
});

@Module({
  providers: [AuthService, AuthResolver, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SendgridMailModule,
    forwardRef(() => PropertyModule),
    forwardRef(() => ChangePasswordTokensModule),
    forwardRef(() => RegistrationTokensModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
