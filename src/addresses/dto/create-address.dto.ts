import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  ward: string;

  @IsString()
  detail: string;
}
