import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateMotelUtilityDto {
  @IsString()
  motelId: string;

  @IsString()
  utilityId: string;

  @IsNumber()
  status: number;
}
