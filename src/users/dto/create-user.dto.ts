import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Gender } from 'src/common/constants';
import { Address } from '../../addresses/address.entity';
import { AddressDto } from '../../addresses/dto/address.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { Role } from '../../roles/role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  birthday: Date;

  @IsString()
  addressId: string;

  @IsString()
  roleId: string;
}
