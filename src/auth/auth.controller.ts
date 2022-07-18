import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../interfaces';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
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
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register' })
  async register(@Body() registerDto: RegisterDto): Promise<IResponse> {
    const userExisted = await this.usersService.findOne({
      email: registerDto.email,
    });
    if (userExisted) {
      throw new BadRequestException('Email address already exists.');
    }

    const role = await this.rolesService.findOne({
      name: registerDto.role,
    });

    const hashedPassword = await this.authService.hashPassword(
      registerDto.password,
    );

    await this.usersService.create({
      data: {
        ...registerDto,
        password: hashedPassword,
        address: {
          create: registerDto.address,
        },
        role: {
          connect: {
            id: role.id,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Register successfully.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto): Promise<IResponse> {
    const userExisted = await this.usersService.findOne({
      email: loginDto.email,
      role: {
        name: {
          not: RoleEnum.ADMIN,
        },
      },
    });
    if (!userExisted) {
      throw new UnauthorizedException('Email address is not correct.');
    }

    const isMatch = this.authService.comparePassword(
      userExisted.password,
      loginDto.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: userExisted.id,
    });

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
    const userExisted = await this.usersService.findOne({
      email: loginAdminDto.email,
      role: {
        name: {
          equals: RoleEnum.ADMIN,
        },
      },
    });
    if (!userExisted) {
      throw new UnauthorizedException('Email address is not correct.');
    }

    const isMatch = this.authService.comparePassword(
      userExisted.password,
      loginAdminDto.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: userExisted.id,
    });

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
