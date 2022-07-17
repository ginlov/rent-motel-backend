import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { AllowedRegisterRoleEnum } from '../../constants';

export class RegisterDto {
  @ApiProperty({ example: 'tranducduy7520@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Duy' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Tran' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '0123456789' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'MALE', enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsDefined()
  address: CreateAddressDto;

  @ApiProperty({ example: 'RENTER', enum: AllowedRegisterRoleEnum })
  @IsEnum(AllowedRegisterRoleEnum)
  role: AllowedRegisterRoleEnum;
}
