import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { cloneDeep } from 'lodash';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AddressesService } from '../addresses/addresses.service';
import { AddressDto } from '../addresses/dto/address.dto';
import { MotelUtility } from './motel-utility.entity';

@Injectable()
export class MotelUtilityService {
  constructor(
    @InjectRepository(MotelUtility)
    private motelUtilityRepository: Repository<MotelUtility>,
  ) {}
}
