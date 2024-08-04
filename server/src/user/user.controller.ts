import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User as UserModel } from '@prisma/client';
import { diskStorage } from 'multer';
import { PaginatedUsers } from 'src/types/paginated-users';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<UserModel[] | PaginatedUsers<UserModel>> {
    return this.userService.findAllUsers(+page, +limit);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.findUserById({ id: Number(id) });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            '.' +
            file.mimetype.split('/')[1];
          cb(null, `${uniqueSuffix}`);
        },
      }),
    }),
  )
  createNewUser(
    @Body()
    createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserModel> {
    if (file) {
      createUserDto.height = +createUserDto.height;
      createUserDto.weight = +createUserDto.weight;
      createUserDto.image = file.filename;
    }
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            '.' +
            file.mimetype.split('/')[1];
          cb(null, `${uniqueSuffix}`);
        },
      }),
    }),
  )
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserModel> {
    if (file) {
      updateUserDto.image = file.filename;
    }
    return this.userService.updateUserInfo(+id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
