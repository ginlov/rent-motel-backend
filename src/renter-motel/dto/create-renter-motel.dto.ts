import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateRenterMotelDto {
  @IsString()
  motelId: string;

  @IsNumber()
  deposit: number;
}
