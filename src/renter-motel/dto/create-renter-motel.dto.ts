import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { Motel } from '../../motels/motel.entity';

export class CreateRenterMotelDto {
  @IsString()
  @IsOptional()
  renterId: string;

  @IsString()
  motelId: string;

  @IsNumber()
  deposit: number;
}
