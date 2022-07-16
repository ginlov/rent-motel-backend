import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserDto } from '../users/dto/user.dto';
import { TransformResponse } from '../interceptors/transform-response.interceptor';
import { IResponse } from '../common/interfaces';

@Controller('admin/auth')
export class AuthAdminController {
  constructor(private authService: AuthService) {}

  @TransformResponse()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userLoginData: AuthLoginDto): Promise<IResponse> {
    const token = await this.authService.adminLogin(userLoginData);

    return {
      message: 'Login successfully',
      data: token,
    };
  }
}
