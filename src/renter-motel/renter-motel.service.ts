import { Injectable } from '@nestjs/common';
import { Prisma, RenterMotelStatusEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAcceptedRentDto } from './dto/update-accepted-rent.dto';
import { UpdateContactedRentDto } from './dto/update-contacted-rent';

@Injectable()
export class RenterMotelService {
  constructor(private prisma: PrismaService) {}

  async create(renterId: string, motelId: string) {
    return await this.prisma.renterMotel.create({
      data: {
        motel: {
          connect: {
            id: motelId,
          },
        },
        renter: {
          connect: {
            id: renterId,
          },
        },
        status: RenterMotelStatusEnum.PENDING,
      },
    });
  }

  async findAll(
    renterMotelWhereInput: Prisma.RenterMotelWhereInput,
    renterMotelFindManyArgs: Prisma.RenterMotelFindManyArgs,
  ) {
    return await this.prisma.renterMotel.findMany({
      where: renterMotelWhereInput,
      ...renterMotelFindManyArgs,
    });
  }

  async findOne(renterId: string, motelId: string) {
    return await this.prisma.renterMotel.findUnique({
      where: {
        renterId_motelId: {
          renterId: renterId,
          motelId: motelId,
        },
      },
    });
  }

  updateContacted(updateContactedRentDto: UpdateContactedRentDto) {
    // return `This action updates a #${id} renterMotel`;
  }

  updateAccepted(updateAcceptedRentDto: UpdateAcceptedRentDto) {
    // return `This action updates a #${id} renterMotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} renterMotel`;
  }
}
