import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMotelDto } from './dto/create-motel.dto';
import { UpdateMotelDto } from './dto/update-motel.dto';

@Injectable()
export class MotelsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createMotelDto: CreateMotelDto) {
    const motel = await this.prisma.motel.create({
      data: {
        ...createMotelDto,
        isPublic: false,
        address: {
          create: createMotelDto.address,
        },
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return motel;
  }

  async findAll(
    motelWhereInput: Prisma.MotelWhereInput,
    motelFindManyArgs: Prisma.MotelFindManyArgs,
  ) {
    const motels = await this.prisma.motel.findMany({
      where: motelWhereInput,
      ...motelFindManyArgs,
    });

    const motelsLength = (
      await this.prisma.motel.aggregate({
        where: motelWhereInput,
        _count: true,
      })
    )._count;

    return {
      items: motels,
      totalItems: motelsLength,
    };
  }

  async findOne(id: string) {
    const motel = await this.prisma.motel.findFirst({
      where: {
        id: id,
      },
    });

    return motel;
  }

  update(id: string, updateMotelDto: UpdateMotelDto) {
    return `This action updates a #${id} motel`;
  }

  remove(id: string) {
    return `This action removes a #${id} motel`;
  }
}
