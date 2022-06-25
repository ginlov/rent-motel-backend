import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateChatHistoryDto {
  @IsString()
  receiverId: string;

  @IsString()
  message: string;
}
