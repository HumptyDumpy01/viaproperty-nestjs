// src/auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

export type JWTPayloadType = {
  id: string;
  email: string;
  initials: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded as JWTPayloadType;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
