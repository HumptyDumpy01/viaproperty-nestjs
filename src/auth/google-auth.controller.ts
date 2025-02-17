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
    await this.authService.loginViaGoogle(req.user as UserAuthType);
    res.redirect(`http://localhost:3000?accessToken=${1234}`);
  }
}
