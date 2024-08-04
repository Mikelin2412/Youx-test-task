import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PaginatedUsers } from 'src/types/paginated-users';

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

  async findAllUsers(
    page?: number,
    limit?: number,
  ): Promise<User[] | PaginatedUsers<User>> {
    if (page && limit) {
      return this.findUsersWithPagination(page, limit);
    }

    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users;
  }

  async findUsersWithPagination(
    page: number,
    limit: number,
  ): Promise<PaginatedUsers<User>> {
    const [total, users] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);
    return {
      data: users,
      meta: {
        total,
        currentPage: page,
        limit,
      },
    };
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
    if (updateUserDto.height) updateUserDto.height = +updateUserDto.height;
    if (updateUserDto.weight) updateUserDto.weight = +updateUserDto.weight;
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
