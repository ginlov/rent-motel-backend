import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { IResponse } from '../interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '@prisma/client';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('utilities')
@ApiTags('Utility')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post('/admin')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create utility - ADMIN' })
  async create(@Body() createUtilityDto: CreateUtilityDto): Promise<IResponse> {
    if (this.utilitiesService.findOne(createUtilityDto.type)) {
      throw new BadRequestException('The utility type already exists.');
    }

    await this.utilitiesService.create(createUtilityDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Create utility successfully.',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get utility list' })
  async findAll(): Promise<IResponse> {
    const utilities = await this.utilitiesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get utility list successfully.',
      data: utilities,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.utilitiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUtilityDto: UpdateUtilityDto) {
  //   return this.utilitiesService.update(+id, updateUtilityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.utilitiesService.remove(+id);
  // }
}
