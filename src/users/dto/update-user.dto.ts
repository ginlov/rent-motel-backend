import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';

export class UpdateUserDto {
  @ApiProperty({ example: 'Duy' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Tran' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '0123456789' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'MALE', enum: GenderEnum })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  address?: UpdateAddressDto;
}
