import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { Utility } from './utility.entity';

@Injectable()
export class UtilitiesService {
  constructor(
    @InjectRepository(Utility) private utilitiesRepository: Repository<Utility>,
  ) {}

  async findOne(options: FindOneOptions<Utility>) {
    return await this.utilitiesRepository.findOne(options);
  }

  async create(createUtilityDto: CreateUtilityDto) {
    return await this.utilitiesRepository.save(
      this.utilitiesRepository.create(createUtilityDto),
    );
  }

  async update(utilityId: string, updateUtilityDto: CreateUtilityDto) {
    return await this.utilitiesRepository.save({
      id: utilityId,
      ...updateUtilityDto,
    });
  }
}
