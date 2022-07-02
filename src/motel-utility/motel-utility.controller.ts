import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IResponse } from '../common/interfaces';
import { CreateMotelUtilityDto } from './dto/create-motel-utility.dto';
import { MotelUtilityService } from './motel-utility.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('motel-utility')
export class MotelUtilityController {
  constructor(private motelUtitlityService: MotelUtilityService) {}

  @Post('')
  async createMotelUitility(
    @Request() request,
    @Body() motelUtilityData: CreateMotelUtilityDto,
  ): Promise<IResponse> {
    const motel = await this.motelUtitlityService.create(motelUtilityData);

    return {
      message: `Add utility successfully.`,
      data: motel,
    };
  }
}
