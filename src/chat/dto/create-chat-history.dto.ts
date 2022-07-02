import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Column } from 'typeorm';
import { User } from '../../users/user.entity';

export class CreateChatHistoryDto {
  @ValidateNested({ each: true })
  @Type(() => User)
  receiver: User;

  @IsString()
  message: string;
}
