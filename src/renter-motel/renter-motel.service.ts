import { Injectable } from '@nestjs/common';
import { Prisma, RenterMotelStatusEnum } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContactedDto } from './dto/update-contacted-rent';
import { UpdateRentedDto } from './dto/update-rented-rent.dto';

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

  async updateContacted(updateContactedDto: UpdateContactedDto) {
    return await this.prisma.renterMotel.update({
      where: {
        renterId_motelId: {
          renterId: updateContactedDto.renterId,
          motelId: updateContactedDto.motelId,
        },
      },
      data: {
        status: RenterMotelStatusEnum.CONTACTED,
      },
    });
  }

  async updateRented(updateRentedDto: UpdateRentedDto) {
    return await this.prisma.renterMotel.update({
      where: {
        renterId_motelId: {
          renterId: updateRentedDto.renterId,
          motelId: updateRentedDto.motelId,
        },
      },
      data: {
        status: RenterMotelStatusEnum.CONTACTED,
        startDate: new Date(),
        deposit: updateRentedDto.deposit,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} renterMotel`;
  }
}
