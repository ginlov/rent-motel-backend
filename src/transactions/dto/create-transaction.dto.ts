import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 50 })
  electricNumber?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 3000 })
  electricPrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 5 })
  waterNumber?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 4000 })
  ApiPropertyOptional?: number;

  @IsString()
  @ApiProperty({ example: '711b5d5f-0f3e-4163-8803-886506b82dcd' })
  motelId: string;
}
