import { Body, Controller, Get, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }
    
  @Post('user')
  async signupUser(
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
