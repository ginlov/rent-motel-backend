import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressesRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.addressesRepository.save(
      this.addressesRepository.create(createAddressDto),
    );
  }

  async update(id: string, createAddressDto: CreateAddressDto) {
    return await this.addressesRepository.save({
      id: id,
      ...createAddressDto,
    });
  }

  async delete(id: string) {
    return await this.addressesRepository.delete({
      id: id,
    });
  }
}
