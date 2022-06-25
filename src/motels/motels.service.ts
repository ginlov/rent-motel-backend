import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { cloneDeep } from 'lodash';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AddressesService } from '../addresses/addresses.service';
import { AddressDto } from '../addresses/dto/address.dto';
import { CreateMotelDto } from './dto/create-motel.dto';
import { MotelDto } from './dto/motel.dto';
import { Motel } from './motel.entity';

@Injectable()
export class MotelsService {
  constructor(
    @InjectRepository(Motel) private motelsRepository: Repository<Motel>,
    private addressesService: AddressesService,
  ) {}

  async find(options: FindManyOptions<Motel>) {
    const motels = await this.motelsRepository.find(options);

    /* populate */
    if ('join' in options) {
      motels.forEach((motel) => {
        motel['address'] = plainToInstance(
          AddressDto,
          cloneDeep(motel.addressId),
        );
        return motel;
      });
    }

    return motels;
  }

  async findOne(options: FindOneOptions<Motel>) {
    let motel: Motel;
    try {
      motel = await this.motelsRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException('Motel not found');
    }
    /* populate */
    if ('join' in options) {
      motel['address'] = plainToInstance(
        AddressDto,
        cloneDeep(motel.addressId),
      );
    }

    return motel;
  }

  async create(motelData: CreateMotelDto) {
    const address = await this.addressesService.create(motelData.address);

    return await this.motelsRepository.save(
      this.motelsRepository.create({
        ...motelData,
        addressId: address.id,
      }),
    );
  }

  async update(id: string, motelData: CreateMotelDto) {
    const motel = await this.motelsRepository.findOne({
      where: {
        id: id,
      },
      loadRelationIds: true,
    });

    await this.addressesService.update(motel.addressId, motelData.address);

    return await this.motelsRepository.save({
      id: id,
      ...motelData,
    });
  }

  async delete(id: string) {
    const motel = await this.motelsRepository.findOne({
      where: {
        id: id,
      },
      loadRelationIds: true,
    });
    await this.addressesService.delete(motel.addressId);

    return await this.motelsRepository.delete({
      id: id,
    });
  }
}
