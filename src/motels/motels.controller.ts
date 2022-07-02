import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { IResponse, QueryMotelList } from '../common/interfaces';
import { transformQuery } from '../common/utils';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateMotelDto } from './dto/create-motel.dto';
import { MotelDto } from './dto/motel.dto';
import { Motel } from './motel.entity';
import { MotelsService } from './motels.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Serialize(MotelDto)
@Controller('motels')
export class MotelsController {
  constructor(private motelsService: MotelsService) {}

  @Get('')
  async getMotels(@Query() query: QueryMotelList): Promise<IResponse> {
    const filters = transformQuery(query) as FindManyOptions<Motel>;

    const motels = await this.motelsService.find({
      ...filters,
      relations: ['renterMotel', ''],
    });

    return {
      message: 'Get the list of motels successfully',
      data: motels,
    };
  }

  @Get(':id')
  async getMotelById(@Param('id') motelId: string): Promise<IResponse> {
    const options: FindManyOptions<Motel> = {
      where: {
        id: motelId,
      },
    };
    const motel = await this.motelsService.findOne(options);

    return {
      message: 'Get motel detail successfully',
      data: motel,
    };
  }

  @Post('')
  async createMotel(@Body() motelData: CreateMotelDto): Promise<IResponse> {
    const motel = await this.motelsService.create(motelData);

    return {
      message: 'Create motel successfully',
      data: motel,
    };
  }

  @Put(':id')
  async updateMotel(
    @Param('id') motelId: string,
    @Body() motelData: CreateMotelDto,
  ): Promise<IResponse> {
    const motel = await this.motelsService.update(motelId, motelData);

    return {
      message: 'Update motel successfully',
      data: motel,
    };
  }

  @Delete(':id')
  async deleteMotel(@Param('id') motelId: string): Promise<IResponse> {
    await this.motelsService.delete(motelId);

    return {
      message: 'Delete motel successfully',
    };
  }
}
