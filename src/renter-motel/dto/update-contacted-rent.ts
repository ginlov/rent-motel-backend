import { IsNumber, IsString } from 'class-validator';

export class UpdateContactedDto {
  @IsString()
  renterId: string;

  @IsString()
  motelId: string;
}
