import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { cloneDeep } from 'lodash';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AddressesService } from '../addresses/addresses.service';
import { AddressDto } from '../addresses/dto/address.dto';
import { MotelUtilityService } from '../motel-utility/motel-utility.service';
import { RenterMotelService } from '../renter-motel/renter-motel.service';
import { UsersService } from '../users/users.service';
import { CreateMotelDto } from './dto/create-motel.dto';
import { MotelDto } from './dto/motel.dto';
import { Motel } from './motel.entity';

@Injectable()
export class MotelsService {
  constructor(
    @InjectRepository(Motel) private motelsRepository: Repository<Motel>,
    private addressesService: AddressesService,
    private renterMotelService: RenterMotelService,
    private usersService: UsersService,
    private motelUtilityService: MotelUtilityService,
  ) {}

  async find(options: FindManyOptions<Motel>) {
    const motels = await this.motelsRepository.find(options);

    return motels;
  }

  async findOne(options: FindOneOptions<Motel>, populate = false) {
    let motel: Motel;
    try {
      motel = await this.motelsRepository.findOne(options);

      if (populate) {
        if (motel.renterMotel) {
          // populate renterMotel
          const renterMotel = await this.renterMotelService.findOne({
            where: {
              id: motel.renterMotel.id,
            },
            relations: ['renter', 'motel'],
          });

          motel.renterMotel = renterMotel;

          const renter = await this.usersService.findOne({
            where: {
              id: renterMotel.renter.id,
            },
            relations: ['address', 'role'],
          });

          motel.renterMotel.renter = renter;
        }

        if (motel.motelUtilities.length > 0) {
          // populate motelUtility
          for (let [index, utility] of motel.motelUtilities.entries()) {
            motel.motelUtilities[index] =
              await this.motelUtilityService.findOne({
                where: {
                  id: utility.id,
                },
                relations: ['utility'],
              });
            console.log(motel.motelUtilities[index]);
          }
        }
      }

      return motel;
    } catch (error) {
      throw new NotFoundException('Motel not found');
    }
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

  async publicMotel(motelId: string) {
    return await this.motelsRepository.save({
      id: motelId,
      isPublic: true,
    });
  }
}
