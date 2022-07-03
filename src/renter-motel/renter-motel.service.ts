import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { MotelsService } from '../motels/motels.service';
import { CreateRenterMotelDto } from './dto/create-renter-motel.dto';
import { RenterMotel } from './renter-motel.entity';

@Injectable()
export class RenterMotelService {
  constructor(
    @InjectRepository(RenterMotel)
    private renterMotelRepository: Repository<RenterMotel>,
    @Inject(forwardRef(() => MotelsService))
    private motelsService: MotelsService,
  ) {}

  async create(renterMotelData: CreateRenterMotelDto) {
    const motelExisted = await this.motelsService.findOne({
      where: {
        id: renterMotelData.motelId,
      },
    });
    if (!motelExisted) {
      throw new NotFoundException('Invalid motel id');
    }

    const renterMotelExisted = await this.renterMotelRepository.findOne({
      where: [
        {
          renter: {
            id: renterMotelData.renterId,
          },
        },
        {
          motel: {
            id: renterMotelData.motelId,
          },
        },
      ],
    });

    if (renterMotelExisted) {
      throw new ConflictException('User rented this motel');
    }

    return await this.renterMotelRepository.save(
      this.renterMotelRepository.create({
        ...renterMotelData,
        renter: {
          id: renterMotelData.renterId,
        },
        motel: {
          id: renterMotelData.motelId,
        },
        status: 1,
        startDate: new Date(),
      }),
    );
  }

  async findOne(options: FindOneOptions<RenterMotel>) {
    return await this.renterMotelRepository.findOne(options);
  }
}
