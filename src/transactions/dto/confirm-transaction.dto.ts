import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ConfirmTransactionDto {
  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  isConfirm: boolean;
}
