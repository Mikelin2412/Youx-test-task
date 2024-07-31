import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.findUserById({ id: Number(id) });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createNewUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUserInfo(+id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
