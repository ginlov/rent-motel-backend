import { IsString } from 'class-validator';

export class MessageContentDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  @IsString()
  message: string;
}
