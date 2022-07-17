import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../interfaces';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@Serialize()
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register' })
  async register(@Body() registerDto: RegisterDto): Promise<IResponse> {
    await this.authService.register(registerDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Register successfully.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto): Promise<IResponse> {
    const token = await this.authService.login(loginDto, false);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully.',
      data: {
        accessToken: token,
        expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    };
  }

  @Post('/admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login Admin' })
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<IResponse> {
    const token = await this.authService.login(loginAdminDto, true);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully.',
      data: {
        accessToken: token,
        expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    };
  }
}
