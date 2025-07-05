import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  async findOne() {
    const user = await this.userService.findOne(1);
    return user;
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(1, updateUserDto);
    return updatedUser;
  }

  @Delete()
  async remove() {
    const response = await this.userService.remove(1);
    return response;
  }
}
