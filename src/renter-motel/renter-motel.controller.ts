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
import { UpdateAcceptedRentDto } from './dto/update-accepted-rent.dto';
import { UpdateContactedRentDto } from './dto/update-contacted-rent';
import { Roles } from '../auth/decorators/role.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MotelsService } from '../motels/motels.service';
import { IResponse } from '../interfaces';
import { GetRenterMotelListQueryDto } from './dto/get-renter-motel-list-query.dto';

@Controller('')
@ApiTags('Motel')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class RenterMotelController {
  constructor(
    private readonly renterMotelService: RenterMotelService,
    private motelsServive: MotelsService,
  ) {}

  @Post('rent-motel/:id')
  @Roles(RoleEnum.RENTER)
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
        skip: query.offset,
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
  @ApiOperation({ summary: 'Update contacted status - ADMIN' })
  updateContacted(@Body() updateContactedRentDto: UpdateContactedRentDto) {
    return this.renterMotelService.updateContacted(updateContactedRentDto);
  }

  @Post('update-accepted')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update accepted status - ADMIN' })
  updateAccpted(@Body() updateRenterMotelDto: UpdateAcceptedRentDto) {
    return this.renterMotelService.updateAccepted(updateRenterMotelDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.renterMotelService.remove(+id);
  // }
}
