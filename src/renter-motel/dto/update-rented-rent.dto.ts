import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateRentedDto {
  @IsString()
  renterId: string;

  @IsString()
  motelId: string;

  @IsNumber()
  @Min(0)
  deposit: number;
}
