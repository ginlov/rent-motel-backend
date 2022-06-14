import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../common/interfaces';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Serialize(UserDto)
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request): Promise<IResponse> {
    const options = {
      where: {
        id: request.user.id,
      },
    };
    const user = await this.usersService.findOne(options);

    return {
      message: 'Get user profile successfully.',
      data: user,
    };
  }
}
