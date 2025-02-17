import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

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
      res.redirect(
        `https://feat-google-sign-in--viaproperty-dev.netlify.app/auth/login?error=${error}`,
      );
    }

    // Set the access_token cookie in the same format as the front-end
    /*res.setHeader(
      'Set-Cookie',
      `access_token=${accessToken}; Path=/; Max-Age=${1000 * 60 * 60 * 24 * 7};`,
    );*/

    res.cookie('access_token', accessToken, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.redirect('https://feat-google-sign-in--viaproperty-dev.netlify.app');
  }
}
