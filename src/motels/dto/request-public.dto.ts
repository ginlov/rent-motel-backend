import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { GetListQueryDto } from '../../dtos';

export class RequestPublicDto extends GetListQueryDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  requestPublic?: boolean;
}
