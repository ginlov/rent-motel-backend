import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsOptional()
  electricNumber: number;

  @IsNumber()
  @IsOptional()
  electricPrice: number;

  @IsNumber()
  @IsOptional()
  waterNumber: number;

  @IsNumber()
  @IsOptional()
  waterPrice: number;

  @IsNumber()
  totalPrice: number;
}
