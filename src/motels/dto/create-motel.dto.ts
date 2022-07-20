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

  @ApiProperty({
    example:
      'https://xaydungthuanphuoc.com/upload/Images/H%c3%8cNH%20C%e1%bb%a6A%20GIANG/ph%c3%b2ng%20tr%e1%bb%8d%20c%c3%b3%20g%c3%a1c/mau-phong-tro-co-gac-lung-dep%20(22).jpg',
  })
  @IsString()
  imageUrl: string;
}
