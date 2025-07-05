import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

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

    const googleId = user.googleid;
    const method = user.method;

    if (!googleId || !method) {
      return res.redirect('http://localhost:5173/');
    }

    const token = jwt.sign(
      { googleid: googleId, userid: user.id },
      process.env.SECRET,
      { expiresIn: 86400 },
    );
    return res.redirect(
     `${`http://localhost:5173/`}/?userid=${token}&method=${method},`
    );
  }  
}


