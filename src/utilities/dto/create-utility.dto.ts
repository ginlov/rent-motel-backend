import { IsString } from 'class-validator';

export class CreateUtilityDto {
  @IsString()
  type: string;
}
