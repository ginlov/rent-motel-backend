import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateMotelDto {
  @ApiProperty({ example: 2000000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  electricPrice: number;

  @ApiProperty({ example: 4000 })
  @IsNumber()
  waterPrice: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  square: number;

  @ApiProperty({ example: 'Phòng trọ giá rẻ nhất Hà Nội' })
  @IsString()
  summary: string;

  @ApiProperty({
    example: 'Phong trọ rộng rãi, thoáng mát, được trang bị nhiều tiện nghi',
  })
  @IsString()
  description: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsDefined()
  address: CreateAddressDto;
}
