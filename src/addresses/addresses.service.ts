import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.prisma.address.create({
      data: createAddressDto,
    });
  }

  async findAll() {
    return `This action returns all addresses`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} address`;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    // await this.prisma.address.update();
  }

  async remove(id: string) {
    return `This action removes a #${id} address`;
  }
}
