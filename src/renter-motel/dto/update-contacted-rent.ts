import { IsNumber, IsString } from 'class-validator';

export class UpdateContactedRentDto {
  @IsString()
  renterId: string;

  @IsString()
  motelId: string;
}
