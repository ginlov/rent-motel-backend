import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motel } from './motel.entity';

@Injectable()
export class MotelsService {
  constructor(
    @InjectRepository(Motel) private usersRepository: Repository<Motel>,
  ) {}
}
