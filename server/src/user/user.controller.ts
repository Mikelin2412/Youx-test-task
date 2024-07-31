import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    const user = this.userService.findUserById({ id: Number(id) });
    return user;
  }

  @Post('user')
  async createNewUser(
    @Body()
    userData: {
      name: string;
      surname: string;
      height: number;
      weight: number;
      sex: string;
      address: string;
      image: string;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
