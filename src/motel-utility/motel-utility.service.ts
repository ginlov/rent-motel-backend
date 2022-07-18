import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMotelUtilityDto } from './dto/create-motel-utility.dto';
import { UpdateMotelUtilityDto } from './dto/update-motel-utility.dto';
import { pick } from 'lodash';

@Injectable()
export class MotelUtilityService {
  constructor(private prisma: PrismaService) {}

  async create(createMotelUtilityDto: CreateMotelUtilityDto) {
    return await this.prisma.motelUtility.create({
      data: createMotelUtilityDto,
    });
  }

  findAll() {
    return `This action returns all motelUtility`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motelUtility`;
  }

  async update(updateMotelUtilityDto: UpdateMotelUtilityDto) {
    return await this.prisma.motelUtility.update({
      where: {
        motelId_utilityId: {
          motelId: updateMotelUtilityDto.motelId,
          utilityId: updateMotelUtilityDto.utilityId,
        },
      },
      data: pick(updateMotelUtilityDto, ['status', 'quantity']),
    });
  }

  remove(id: number) {
    return `This action removes a #${id} motelUtility`;
  }
}
