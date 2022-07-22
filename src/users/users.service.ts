import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RegisterDto } from '../auth/dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereInput: Prisma.UserWhereInput,
    userInclude: Prisma.UserInclude = undefined,
  ) {
    const user = await this.prisma.user.findFirst({
      where: userWhereInput,
      include: userInclude,
    });

    return user;
  }

  async create(userCreateArgs: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(userCreateArgs);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto & { password?: string },
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
        address: {
          update: updateUserDto.address,
        },
      },
    });

    return user;
  }
}
