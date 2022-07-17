import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { isFloat64Array } from 'util/types';
import { MotelListOrderByEnum } from '../../constants';

export class GetMotelListQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    name: 'limit',
    minimum: 0,
  })
  limit?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({
    name: 'offset',
    minimum: 1,
  })
  offset?: number;

  @IsEnum(MotelListOrderByEnum)
  @IsOptional()
  @ApiProperty({
    name: 'order-by',
    enum: MotelListOrderByEnum,
  })
  'order-by'?: MotelListOrderByEnum;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    name: 'price',
    minimum: 0,
    description: 'Max price',
  })
  price?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    name: 'square',
    minimum: 0,
    description: 'Max square',
  })
  square?: number;

  @IsOptional()
  @ApiProperty({
    name: 'district',
    description: 'District name',
  })
  district?: string;
}
