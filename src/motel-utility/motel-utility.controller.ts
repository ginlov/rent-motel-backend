import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { MotelUtilityService } from './motel-utility.service';
import { CreateMotelUtilityDto } from './dto/create-motel-utility.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { Motel, Prisma, RoleEnum, User } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MotelsService } from '../motels/motels.service';
import { UpdateMotelUtilityDto } from './dto/update-motel-utility.dto';
import { IResponse } from '../interfaces';
import { UtilitiesService } from '../utilities/utilities.service';

@Controller('motel-utility')
@ApiTags('Motel')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class MotelUtilityController {
  constructor(
    private readonly motelUtilityService: MotelUtilityService,
    private motelsService: MotelsService,
    private utilitiesService: UtilitiesService,
  ) {}

  @Post('')
  @Roles(RoleEnum.OWNER)
  @ApiOperation({ summary: 'Add utility to motel - OWNER' })
  async create(
    @Body() createMotelUtilityDto: CreateMotelUtilityDto,
    @GetUser() user: User & { motels: Motel[] },
  ): Promise<IResponse> {
    const motelExisted = await this.motelsService.findOne(
      createMotelUtilityDto.motelId,
    );
    if (!motelExisted) {
      throw new BadRequestException('Motel not found.');
    }

    const utilityExisted = await this.utilitiesService.findOne({
      where: {
        id: createMotelUtilityDto.utilityId,
      },
    });
    if (!utilityExisted) {
      throw new BadRequestException('Utility not found.');
    }

    if (
      !user.motels.some((motel) => motel.id === createMotelUtilityDto.motelId)
    ) {
      throw new ForbiddenException('You are not the owner of this motel.');
    }

    await this.motelUtilityService.create(createMotelUtilityDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Add utility to the motel successfully.',
    };
  }

  // @Get()
  // findAll() {
  //   return this.motelUtilityService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.motelUtilityService.findOne(+id);
  // }

  @Patch('')
  @Roles(RoleEnum.OWNER)
  @ApiOperation({ summary: 'Update utility in motel - OWNER' })
  async update(
    @Body() updateMotelUtilityDto: UpdateMotelUtilityDto,
    @GetUser() user: User & { motels: Motel[] },
  ): Promise<IResponse> {
    const motelExisted = await this.motelsService.findOne(
      updateMotelUtilityDto.motelId,
    );
    if (!motelExisted) {
      throw new BadRequestException('Motel not found.');
    }

    if (
      !user.motels.some((motel) => motel.id === updateMotelUtilityDto.motelId)
    ) {
      throw new ForbiddenException('You are not the owner of this motel.');
    }

    await this.motelUtilityService.update(updateMotelUtilityDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update motel successfully.',
    };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.motelUtilityService.remove(+id);
  // }
}
