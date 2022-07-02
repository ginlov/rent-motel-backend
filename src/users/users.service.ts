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
    console.log(createUserDto);

    return await this.usersRepository.save(
      this.usersRepository.create({
        ...createUserDto,
        address: {
          id: createUserDto.addressId,
        },
        role: {
          id: createUserDto.roleId,
        },
      }),
    );
  }

  async findOne(options: FindOneOptions<User>) {
    console.log(options);

    const user = await this.usersRepository.findOne(options);

    return user;
  }
}
