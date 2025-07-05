import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { GoogleStrategy } from 'src/strategies/google.strategies';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController, GoogleStrategy],
  providers: [AuthService],
})
export class AuthModule {}
