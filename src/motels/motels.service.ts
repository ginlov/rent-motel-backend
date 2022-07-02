import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const motels = await this.motelsRepository.find({
      ...options,
      relations: ['address', 'renterMotel'],
    });

    return motels;
  }

  async findOne(options: FindOneOptions<Motel>) {
    let motel: Motel;
    try {
      motel = await this.motelsRepository.findOne({
        ...options,
        relations: ['address', 'renterMotel'],
      });
    } catch (error) {
      throw new NotFoundException('Motel not found');
    }

    return motel;
  }

  async create(motelData: CreateMotelDto) {
    const address = await this.addressesService.create(motelData.address);

    return await this.motelsRepository.save(
      this.motelsRepository.create({
        ...motelData,
        address: {
          id: address.id,
        },
      }),
    );
  }

  async update(id: string, motelData: CreateMotelDto) {
    const motelExisted = await this.motelsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['address'],
    });

    if (!motelExisted) {
      throw new BadRequestException('Motel not found');
    }

    await this.addressesService.update(
      motelExisted.address.id,
      motelData.address,
    );

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
    await this.addressesService.delete(motel.address.id);

    return await this.motelsRepository.delete({
      id: id,
    });
  }
}
