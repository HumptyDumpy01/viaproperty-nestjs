// src/auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';

export type JWTPayloadType = {
  id: string;
  email: string;
  initials: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];
    console.log('token:', token);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as JWTPayloadType;
      request.user = decoded;

      const user = this.authService.getUserData(decoded.id);

      if (!user) {
        new NotFoundException('User does not exist.');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException(`Invalid token: (${err})`);
    }
  }
}
