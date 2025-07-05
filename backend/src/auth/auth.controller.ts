import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req, @Res() res) {
    const user = req.user;

    const googleId = user.googleId;

    if (!googleId) {
      res.redirect(`${process.env.FRONTEND}`);
    }

    const token = jwt.sign(
      { googleid: googleId, userid: user.id },
      process.env.SECRET,
      { expiresIn: 86400 },
    );
    res.redirect(
     `${process.env.FRONTEND}?userid=${token}`,
    );
  }
}