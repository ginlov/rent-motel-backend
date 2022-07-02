import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateMotelDto {
  @IsNumber()
  price: number;

  @IsNumber()
  waterPrice: number;

  @IsNumber()
  electricPrice: number;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsString()
  summary: string;

  @IsString()
  description: string;
}
