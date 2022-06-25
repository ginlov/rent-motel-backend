import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../common/interfaces';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Serialize(UserDto)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getProfile(@Request() request): Promise<IResponse> {
    const options: FindOneOptions<User> = {
      where: {
        id: request.user.id,
      },
      join: {
        alias: 'users',
        leftJoinAndSelect: {
          roles: 'users.roleId',
          addresses: 'users.addressId',
        },
      },
    };
    const user = await this.usersService.findOne(options);

    return {
      message: 'Get user profile successfully.',
      data: user,
    };
  }
}
