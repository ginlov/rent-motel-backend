import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(userWhereInput: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: userWhereInput,
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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
