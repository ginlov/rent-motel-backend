import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMotelUtilityDto {
  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  @IsString()
  motelId: string;

  @ApiProperty({ example: '10474de9-059e-443f-bc02-9a1b67ead763' })
  @IsString()
  utilityId: string;

  @ApiProperty({ example: 'Bình thường' })
  @IsString()
  status: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;
}
