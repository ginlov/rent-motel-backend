import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { IResponse } from '../interfaces';
import { MotelUtilityService } from '../motel-utility/motel-utility.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { RoleEnum, User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private motelUtilityService: MotelUtilityService,
  ) {}

  @Post()
  @Serialize()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.RENTER)
  @ApiOperation({ summary: 'Create report - RENTER' })
  async create(
    @Body() createReportDto: CreateReportDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    await this.reportsService.create(createReportDto);

    const motelUtility = await this.motelUtilityService.findOne({
      where: {
        id: createReportDto.motelUtilityId,
        motel: {
          renterMotel: {
            some: {
              renter: {
                id: user.id,
              },
            },
          },
        },
      },
    });

    if (!motelUtility) {
      throw new BadRequestException('Motel Utility is invalid.');
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create report successfully.',
    };
  }

  @Get()
  @Serialize()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unprocessed report - ADMIN' })
  async findAll(): Promise<IResponse> {
    const reports = await this.reportsService.findAll({
      where: {
        status: false,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Get report list successfully.',
      data: reports,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reportsService.findOne(+id);
  // }

  @Post(':id')
  @Serialize()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark processed report - ADMIN' })
  async update(@Param('id') id: string): Promise<IResponse> {
    await this.reportsService.update(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Report is updated.',
    };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportsService.remove(+id);
  // }
}
