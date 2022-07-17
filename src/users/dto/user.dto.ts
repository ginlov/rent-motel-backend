import { Address, GenderEnum, Role } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

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
  role: Role;

  @Expose()
  address: Address;
}
