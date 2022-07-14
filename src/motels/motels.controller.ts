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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { FindManyOptions } from 'typeorm';
import { AwsS3Service } from '../aws/aws-s3.service';
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
  constructor(
    private motelsService: MotelsService,
    private awsS3Service: AwsS3Service,
  ) {}

  @Get('')
  async getMotelList(@Query() query: QueryMotelList): Promise<IResponse> {
    const filters = transformQuery(query) as FindManyOptions<Motel>;

    const motels = await this.motelsService.find({
      ...filters,
      relations: ['address', 'renterMotel', 'motelUtilities'],
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
      relations: ['address', 'renterMotel', 'motelUtilities'],
    };
    const motel = await this.motelsService.findOne(options, true);

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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMotelImage(
    @UploadedFile() file,
    @Request() request,
  ): Promise<IResponse> {
    const fileLocation = await this.awsS3Service.uploadFile(file);

    return {
      data: {
        imageUrl: fileLocation,
      },
    };
  }
}
