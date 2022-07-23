import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateRentedDto {
  @IsString()
  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  renterId: string;

  @IsString()
  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  motelId: string;
}
