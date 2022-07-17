import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MotelsService } from './motels.service';
import { CreateMotelDto } from './dto/create-motel.dto';
import { UpdateMotelDto } from './dto/update-motel.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQueryOptions,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { RoleEnum, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetMotelListQueryDto } from './dto/get-motel-list-query.dto';
import { MotelListOrderByEnum } from '../constants';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MotelDto } from './dto/motel.dto';
import { transformQuery } from '../utils';
import { lte } from 'lodash';

@Controller('motels')
@ApiTags('Motel')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Serialize(MotelDto)
export class MotelsController {
  constructor(private readonly motelsService: MotelsService) {}

  @Post()
  @Roles(RoleEnum.OWNER)
  @ApiOperation({ summary: 'Create new motel - OWNER' })
  async create(
    @GetUser() user: User,
    @Body() createMotelDto: CreateMotelDto,
  ): Promise<IResponse> {
    const motel = await this.motelsService.create(user.id, createMotelDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created motel.',
      data: motel,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get motel list' })
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetMotelListQueryDto,
  ): Promise<IResponse> {
    const data = await this.motelsService.findAll(
      {
        isPublic: true,
        price: {
          lte: query.price,
        },
        square: {
          lte: query.square,
        },
        address: {
          district: query.district,
        },
      },
      {
        skip: query.offset ? query.offset - 1 : undefined,
        take: query.limit,
        orderBy: transformQuery(query['order-by']),
        include: {
          address: true,
          owner: true,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Get public motel list successfully.',
      data: data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get motel by id' })
  async findOne(@Param('id') id: string): Promise<IResponse> {
    const motel = await this.motelsService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Get motel detail successfully.',
      data: motel,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMotelDto: UpdateMotelDto) {
  //   return this.motelsService.update(id, updateMotelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.motelsService.remove(id);
  // }
}
