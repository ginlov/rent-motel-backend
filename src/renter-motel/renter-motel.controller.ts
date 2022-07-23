import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RenterMotelService } from './renter-motel.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role, RoleEnum, User } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MotelsService } from '../motels/motels.service';
import { IResponse } from '../interfaces';
import { GetRenterMotelListQueryDto } from './dto/get-renter-motel-list-query.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateContactedDto } from './dto/update-contacted-rent';
import { UpdateRentedDto } from './dto/update-rented-rent.dto';
import { UsersService } from '../users/users.service';

@Controller('')
@ApiTags('Motel')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class RenterMotelController {
  constructor(
    private readonly renterMotelService: RenterMotelService,
    private motelsServive: MotelsService,
    private usersService: UsersService,
  ) {}

  @Post('rent-motel/:id')
  @Roles(RoleEnum.RENTER)
  @Serialize()
  @ApiOperation({ summary: 'Rent a motel - RENTER' })
  async create(
    @Param('id') motelId: string,
    @GetUser() user: User & { role: Role },
  ): Promise<IResponse> {
    const motelExisted = await this.motelsServive.findOne(motelId, true);
    if (!motelExisted) {
      throw new BadRequestException('Motel does not exist.');
    }

    const renterMotelExisted = await this.renterMotelService.findOne(
      user.id,
      motelExisted.id,
    );
    if (renterMotelExisted) {
      throw new BadRequestException('You rented this motel.');
    }

    await this.renterMotelService.create(user.id, motelId);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Your request has been received.',
    };
  }

  @Get('renter-motel')
  @Roles(RoleEnum.ADMIN)
  @Serialize()
  @ApiOperation({ summary: 'Get renter motel list - ADMIN' })
  async findAll(
    @Query() query: GetRenterMotelListQueryDto,
  ): Promise<IResponse> {
    const renterMotel = await this.renterMotelService.findAll(
      {
        status: query.status,
      },
      {
        take: query.limit,
        skip: query.offset ? query.offset - 1 : undefined,
        include: {
          motel: true,
          renter: true,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Get renter motel list successfully.',
      data: renterMotel,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.renterMotelService.findOne(+id);
  // }

  @Post('update-contacted')
  @Roles(RoleEnum.ADMIN)
  @Serialize()
  @ApiOperation({ summary: 'Update contacted status - ADMIN' })
  async updateContacted(
    @Body() updateContactedDto: UpdateContactedDto,
  ): Promise<IResponse> {
    const userExisted = (await this.usersService.findOne(
      {
        id: updateContactedDto.renterId,
      },
      {
        role: true,
      },
    )) as User & { role: Role };
    if (!userExisted || userExisted.role.name !== RoleEnum.RENTER) {
      throw new BadRequestException('Renter id is invalid.');
    }

    await this.renterMotelService.updateContacted(updateContactedDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update status to contacted successfully.',
    };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.renterMotelService.remove(+id);
  // }
}
