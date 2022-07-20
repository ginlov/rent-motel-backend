import { ApiPropertyOptional } from '@nestjs/swagger';
import { RenterMotelStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { MotelListOrderByEnum } from '../../constants';
import { GetListQueryDto } from '../../dtos';

export class GetMotelListQueryDto extends GetListQueryDto {
  @IsEnum(MotelListOrderByEnum)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'order-by',
    enum: MotelListOrderByEnum,
  })
  'order-by'?: MotelListOrderByEnum;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'price',
    minimum: 0,
    description: 'Max price',
  })
  price?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'square',
    minimum: 0,
    description: 'Max square',
  })
  square?: number;

  @IsOptional()
  @ApiPropertyOptional({
    name: 'district',
    description: 'District name',
  })
  district?: string;
}
