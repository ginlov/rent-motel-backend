import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Role } from '../roles/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: Partial<CreateUserDto>) {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  async findOne(options: FindOneOptions<User>) {
    const user = await this.usersRepository.findOne(options);

    return user;
  }
}
