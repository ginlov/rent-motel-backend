import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateContactedDto {
  @IsString()
  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  renterId: string;

  @IsString()
  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  motelId: string;
}
