import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../interfaces';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

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

    const isMatch = await this.authService.comparePassword(
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

    const isMatch = await this.authService.comparePassword(
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

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const isMatch = this.authService.comparePassword(
      user.password,
      changePasswordDto.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const newHashedPassword = await this.authService.hashPassword(
      changePasswordDto.newPassword,
    );
    await this.usersService.update(user.id, {
      password: newHashedPassword,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Change password successfully.',
    };
  }
}
