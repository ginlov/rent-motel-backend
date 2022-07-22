import { Module } from '@nestjs/common';
import { MotelUtilityService } from './motel-utility.service';
import { MotelUtilityController } from './motel-utility.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MotelsModule } from '../motels/motels.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@Module({
  imports: [PrismaModule, MotelsModule, UtilitiesModule],
  exports: [MotelUtilityService],
  controllers: [MotelUtilityController],
  providers: [MotelUtilityService],
})
export class MotelUtilityModule {}
