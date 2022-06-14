import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserDto } from '../users/dto/user.dto';
import { TransformResponse } from '../interceptors/transform-response.interceptor';
import { IResponse } from '../common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(UserDto)
  @Post('register')
  async register(
    @Body() userRegisterData: AuthRegisterDto,
  ): Promise<IResponse> {
    await this.authService.register(userRegisterData);

    return {
      message: 'Create account successfully.',
    };
  }

  @TransformResponse()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginData: AuthLoginDto): Promise<IResponse> {
    const token = await this.authService.login(userLoginData);

    return {
      message: 'Login successfully.',
      data: token,
    };
  }
}
