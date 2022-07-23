import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Query,
  Delete,
  Patch,
  ForbiddenException,
  UploadedFile,
  UseInterceptors,
  UnprocessableEntityException,
  ParseBoolPipe,
  BadRequestException,
} from '@nestjs/common';
import { MotelsService } from './motels.service';
import { CreateMotelDto } from './dto/create-motel.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IResponse } from '../interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { RoleEnum, User } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetMotelListQueryDto } from './dto/get-motel-list-query.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { MotelDto } from './dto/motel.dto';
import { transformQuery } from '../utils';
import { UpdateMotelDto } from './dto/update-motel.dto';
import { GetListQueryDto } from '../dtos';
import { AwsS3Service } from '../aws/aws-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestPublicDto } from './dto/request-public.dto';
import { PublicMotelDto } from './dto/public-motel.dto';
import { query } from 'express';
import { UploadImageDto } from './dto/upload-image.dto';

@Controller('motels')
@ApiTags('Motel')
export class MotelsController {
  constructor(
    private readonly motelsService: MotelsService,
    private awsS3Service: AwsS3Service,
  ) {}

  @Post()
  @Serialize(MotelDto)
  @Roles(RoleEnum.OWNER)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new motel - OWNER' })
  async create(
    @Body() createMotelDto: CreateMotelDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    await this.motelsService.create(user.id, createMotelDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created motel.',
    };
  }

  @Get('')
  @Serialize()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all motel list - ADMIN' })
  async findAll(@Query() query: GetListQueryDto): Promise<IResponse> {
    const data = await this.motelsService.findAll(
      {},
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
      message: 'Get motel list successfully.',
      data: data,
    };
  }

  @Get('/public')
  @Serialize(MotelDto)
  @ApiOperation({ summary: 'Get public motel list' })
  async findPublic(@Query() query: GetMotelListQueryDto): Promise<IResponse> {
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

  @Get('/owned')
  @Serialize(MotelDto)
  @Roles(RoleEnum.OWNER)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my owned motel list - OWNER' })
  async findOwned(
    @Query() query: GetListQueryDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const data = await this.motelsService.findAll(
      {
        ownerId: user.id,
      },
      {
        skip: query.offset ? query.offset - 1 : undefined,
        take: query.limit,
        include: {
          address: true,
          owner: true,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Get motel list successfully.',
      data: data,
    };
  }

  @Get(':id')
  @Serialize(MotelDto)
  @ApiOperation({ summary: 'Get motel by id' })
  async findOne(@Param('id') id: string): Promise<IResponse> {
    const motel = await this.motelsService.findOne(id);

    if (!motel) {
      throw new BadRequestException('Motel does not exist.');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Get motel detail successfully.',
      data: motel,
    };
  }

  @Patch(':id')
  @Roles(RoleEnum.OWNER)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update motel - OWNER' })
  async update(
    @Param('id') id: string,
    @Body() updateMotelDto: UpdateMotelDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const motel = await this.motelsService.findOne(id);
    if (motel.ownerId !== user.id) {
      throw new ForbiddenException('You are not the owner of this motel');
    }

    await this.motelsService.update(id, updateMotelDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update motel successfully.',
    };
  }

  @Delete(':id')
  @Roles(RoleEnum.OWNER)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete motel - OWNER' })
  async remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const motel = await this.motelsService.findOne(id);
    if (motel.ownerId !== user.id) {
      throw new ForbiddenException('You are not the owner of this motel.');
    }

    await this.motelsService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted motel.',
    };
  }

  @Post('admin/public-motel/:id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Public motel - ADMIN' })
  async publicMotel(
    @Param('id') id: string,
    @Body() publicMotelDto: PublicMotelDto,
  ): Promise<IResponse> {
    await this.motelsService.updateIsPublic(id, publicMotelDto.isPublic);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update public status successfully.',
    };
  }

  @Get('admin/request-public')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get request public motels - ADMIN' })
  async getRequestPublic(
    @Body() requestPublic: RequestPublicDto,
    @Query() query: GetListQueryDto,
  ): Promise<IResponse> {
    const motels = await this.motelsService.findAll(requestPublic, {
      take: query.limit,
      skip: query.offset ? query.offset - 1 : undefined,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Get request public motels successfully.',
      data: motels,
    };
  }

  @Post('upload-image')
  @Serialize()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form')
  @ApiOperation({ summary: 'Upload motel image - OWNER' })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponse> {
    if (!file.mimetype.includes('image')) {
      throw new UnprocessableEntityException('File is not an image.');
    }

    const fileUrl = await this.awsS3Service.uploadFile(file);

    return {
      statusCode: HttpStatus.OK,
      message: 'Upload image successfully.',
      data: {
        imageUrl: fileUrl,
      },
    };
  }

  // @Post()
}
