import { IsString } from 'class-validator';

export class MessageBodyDto {
  @IsString()
  id: string;

  // @IsString()
  // message: string;
}
