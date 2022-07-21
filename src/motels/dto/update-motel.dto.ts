import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';
import { CreateMotelDto } from './create-motel.dto';

export class UpdateMotelDto extends PartialType(CreateMotelDto) {
  @ApiProperty({ example: 2000000 })
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  @IsOptional()
  electricPrice?: number;

  @ApiProperty({ example: 4000 })
  @IsNumber()
  @IsOptional()
  waterPrice?: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  square?: number;

  @ApiProperty({ example: 'Phòng trọ giá rẻ nhất Hà Nội' })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({
    example: 'Phòng trọ rộng rãi, thoáng mát, được trang bị nhiều tiện nghi',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  address?: UpdateAddressDto;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  requestPublic?: boolean;
}
