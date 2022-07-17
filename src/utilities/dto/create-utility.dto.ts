import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUtilityDto {
  @ApiProperty({ example: 'Máy điều hòa' })
  @IsString()
  type: string;
}
