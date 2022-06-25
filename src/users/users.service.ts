import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { RoleDto } from '../roles/dto/role.dto';
import { AddressDto } from '../addresses/dto/address.dto';
import { cloneDeep } from 'lodash';

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
    let user: User;
    try {
      user = await this.usersRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException('User not found');
    }

    /* populate */
    if ('join' in options) {
      user['address'] = plainToInstance(AddressDto, cloneDeep(user.addressId));
      user['role'] = plainToInstance(RoleDto, cloneDeep(user.roleId));
    }

    return user;
  }
}
