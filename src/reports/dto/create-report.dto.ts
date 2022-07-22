import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ example: 'Tủ lạnh bị hỏng' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'a5104e6f-40f3-4e01-a58b-889da4d1133c' })
  @IsString()
  motelUtilityId: string;
}
