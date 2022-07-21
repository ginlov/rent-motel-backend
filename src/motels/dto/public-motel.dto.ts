import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class PublicMotelDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isPublic: boolean;
}
