import {
  BadRequestException,
  ConflictException,
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
import { MotelsService } from '../motels/motels.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { CreateMotelUtilityDto } from './dto/create-motel-utility.dto';
import { MotelUtility } from './motel-utility.entity';

@Injectable()
export class MotelUtilityService {
  constructor(
    @InjectRepository(MotelUtility)
    private motelUtilityRepository: Repository<MotelUtility>,
    @Inject(forwardRef(() => MotelsService))
    private motelsService: MotelsService,
    private utilitiesService: UtilitiesService,
  ) {}

  async create(motelUtilityData: CreateMotelUtilityDto) {
    const motelExisted = await this.motelsService.findOne({
      where: {
        id: motelUtilityData.motelId,
      },
    });

    if (!motelExisted) {
      throw new BadRequestException('Motel Not found');
    }

    const utilityExisted = await this.utilitiesService.findOne({
      where: {
        id: motelUtilityData.utilityId,
      },
    });

    if (!utilityExisted) {
      throw new BadRequestException('Utility Not found');
    }

    const motelUtilityExisted = await this.motelUtilityRepository.findOne({
      where: {
        motel: {
          id: motelUtilityData.motelId,
        },
        utility: {
          id: motelUtilityData.utilityId,
        },
      },
    });

    console.log('haha')

    if (motelUtilityExisted) {
      throw new ConflictException('Utility existed in motel');
    }
    return await this.motelUtilityRepository.save(
      this.motelUtilityRepository.create({
        ...motelUtilityData,
        motel: {
          id: motelUtilityData.motelId,
        },
        utility: {
          id: motelUtilityData.utilityId,
        },
      }),
    );
  }

  async update(motelUtilityData: CreateMotelUtilityDto) {}
}
