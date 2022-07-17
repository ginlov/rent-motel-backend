import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { IResponse } from '../interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @Serialize(UserDto)
  @ApiOperation({ summary: 'Get my profile' })
  async getProfile(@GetUser() user: User): Promise<IResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Get user profile successfully.',
      data: user,
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Update my profile' })
  async update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IResponse> {
    await this.userService.update(user.id, updateUserDto);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Update successfully.',
    };
  }
}
