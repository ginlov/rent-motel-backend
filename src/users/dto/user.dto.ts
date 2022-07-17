import { Address, GenderEnum, Role } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressDto } from '../../addresses/dto/address.dto';
import { RoleDto } from '../../roles/dto/role.dto';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  phone: string;

  @Expose()
  gender: GenderEnum;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;

  @Expose()
  @Type(() => AddressDto)
  address: AddressDto;
}
