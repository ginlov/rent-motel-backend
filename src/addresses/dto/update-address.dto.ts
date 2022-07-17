import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty({ example: 'Ha Noi' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ example: 'Hai Ba Trung' })
  @IsString()
  @IsOptional()
  district: string;

  @ApiProperty({ example: 'Bach Khoa' })
  @IsString()
  @IsOptional()
  ward: string;

  @ApiProperty({ example: 'So 1 Dai Co Viet' })
  @IsString()
  @IsOptional()
  detail: string;
}
