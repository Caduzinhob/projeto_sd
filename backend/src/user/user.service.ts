import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where: { id }});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
     user.name = String(updateUserDto.name);

     const updatedUser = await this.userRepository.save(user);
     return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
