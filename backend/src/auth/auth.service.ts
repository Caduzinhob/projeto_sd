import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {}

  async validateUser(profile:any): Promise<User | null> {
    console.log("Validating user with profile:", profile);
    const { googleId, displayName, emails } = profile;
    const email = emails[0].value;

    let user = await this.userRepository.findOne({ where: { googleId: googleId } });

    if (!user) {
      user = this.userRepository.create({
        googleId: googleId,
        name: displayName,
        email: email,
      });
      await this.userRepository.save(user);
    }

    return user;
  }  

}
