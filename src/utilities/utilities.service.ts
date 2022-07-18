import { Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';

@Injectable()
export class UtilitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createUtilityDto: CreateUtilityDto) {
    return await this.prisma.utility.create({
      data: createUtilityDto,
    });
  }

  async findAll() {
    return await this.prisma.utility.findMany();
  }

  async findOne(type: string) {
    return await this.prisma.utility.findUnique({
      where: {
        type: type,
      },
    });
  }

  update(id: number, updateUtilityDto: UpdateUtilityDto) {
    return `This action updates a #${id} utility`;
  }

  remove(id: number) {
    return `This action removes a #${id} utility`;
  }
}
