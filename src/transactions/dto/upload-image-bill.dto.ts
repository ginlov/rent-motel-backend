import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UploadImageBill extends PartialType(CreateTransactionDto) {
  @IsString()
  @ApiProperty({
    example:
      'https://test-bucket-b9.s3.amazonaws.com/20220720T02%3A59%3A54.000Z-mau-phong-tro-co-gac-lung-dep%20%2822%29.jpg',
  })
  imageUrl: string;
}
