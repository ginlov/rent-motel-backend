import { ApiPropertyOptional } from '@nestjs/swagger';
import { RenterMotelStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { MotelListOrderByEnum } from '../../constants';
import { GetListQueryDto } from '../../dtos';

export class GetRenterMotelListQueryDto extends GetListQueryDto {
  @IsEnum(RenterMotelStatusEnum)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'status',
    description: 'Motel status',
    enum: RenterMotelStatusEnum,
  })
  status?: RenterMotelStatusEnum;
}
