import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 50 })
  electricNumber?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 3000 })
  electricPrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 5 })
  waterNumber?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 4000 })
  waterPrice?: number;

  @IsString()
  @ApiProperty({ example: '711b5d5f-0f3e-4163-8803-886506b82dcd' })
  motelId: string;

  @IsNumber()
  @ApiProperty({ example: 1500000 })
  totalPrice: number;
}
