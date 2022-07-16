import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
