import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Ha Noi' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Hai Ba Trung' })
  @IsString()
  district: string;

  @ApiProperty({ example: 'Bach Khoa' })
  @IsString()
  ward: string;

  @ApiProperty({ example: 'So 1 Dai Co Viet' })
  @IsString()
  detail: string;
}
