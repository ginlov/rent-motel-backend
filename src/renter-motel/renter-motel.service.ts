import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotelsService } from '../motels/motels.service';
import { CreateRenterMotelDto } from './dto/create-renter-motel.dto';
import { RenterMotel } from './renter-motel.entity';

@Injectable()
export class RenterMotelService {
  constructor(
    @InjectRepository(RenterMotel)
    private renterMotelRepository: Repository<RenterMotel>,
    private motelsService: MotelsService,
  ) {}

  async create(renterId: string, renterMotelData: CreateRenterMotelDto) {
    const motelExisted = await this.motelsService.findOne({
      where: {
        id: renterMotelData.motelId,
      },
    });
    if (!motelExisted) {
      throw new NotFoundException('Invalid motel id.');
    }

    const renterMotelExisted = await this.renterMotelRepository.findOne({
      where: {
        // renterId: renterId,
        // motelId: renterMotelData.motelId,
      },
      loadRelationIds: true,
    });

    console.log(renterMotelExisted);

    if (renterMotelExisted) {
      throw new ConflictException('User rented this motel.');
    }

    return await this.renterMotelRepository.save(
      this.renterMotelRepository.create({
        ...renterMotelData,
        renterId: renterId,
        startDate: new Date(),
      }),
    );
  }
}
