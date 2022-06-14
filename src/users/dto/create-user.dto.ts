import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  birthday: Date;

  @IsString()
  addressId: string;

  @IsString()
  roleId: string;
}
