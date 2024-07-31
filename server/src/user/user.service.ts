import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const existUser = await this.prisma.user.findFirst({
      where: data,
    });

    if (existUser) throw new BadRequestException('This user already exist!');

    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUserById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async updateUserInfo(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!existUser) throw new NotFoundException('User not found!');

    const updatedUser = await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!existUser) throw new NotFoundException('User not found!');

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
