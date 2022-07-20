import { IsNumber, IsString } from 'class-validator';

export class UpdateAcceptedRentDto {
  @IsString()
  renterId: string;

  @IsString()
  motelId: string;

  @IsNumber()
  deposit: number;
}
