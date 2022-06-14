import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, Role } from 'src/common/constants';

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum({ [Role.RENTER]: Role.RENTER, [Role.OWNER]: Role.OWNER })
  role: Role;
}
