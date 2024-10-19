import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
