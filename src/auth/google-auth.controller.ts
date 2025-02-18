import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import * as process from 'node:process';

export type UserAuthType = {
  email: string;
  firstName: string;
  lastName: string;
};

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request) {
    // this function initiates the Google Auth flow
  }

  @Get(`callback`)
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken, error } = await this.authService.loginViaGoogle(
      req.user as UserAuthType,
    );
    if (error) {
      res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=${error}`);
    }

    // Set the access_token cookie in the same format as the front-end
    res.setHeader(
      'Set-Cookie',
      `access_token=${accessToken}; Path=/; Max-Age=${1000 * 60 * 60 * 24 * 7};`,
    );
    res.redirect(process.env.FRONTEND_URL);
  }
}
