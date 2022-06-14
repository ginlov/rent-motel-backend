import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { RoleDto } from '../roles/dto/role.dto';
import { AddressDto } from '../addresses/dto/address.dto';

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

  async findOne(options: FindOneOptions<User>, populate = false) {
    let user = await this.usersRepository.findOne(options);

    if (populate) {
      user = await this.usersRepository
        .createQueryBuilder('users')
        .where('users.id = :id', { id: user.id })
        .leftJoinAndSelect('users.addressId', 'addresses')
        .leftJoinAndSelect('users.roleId', 'roles')
        .getOne();

      user['address'] = plainToInstance(
        AddressDto,
        JSON.parse(JSON.stringify(user.addressId)),
      );
      user['role'] = plainToInstance(
        RoleDto,
        JSON.parse(JSON.stringify(user.roleId)),
      );
    }

    return user;
  }
}
