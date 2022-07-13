import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Gender, Role } from 'src/common/constants';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class AuthRegisterDto {
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

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsEnum({ [Role.RENTER]: Role.RENTER, [Role.OWNER]: Role.OWNER })
  role: Role;
}
