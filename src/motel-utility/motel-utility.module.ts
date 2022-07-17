import { Module } from '@nestjs/common';
import { MotelUtilityService } from './motel-utility.service';
import { MotelUtilityController } from './motel-utility.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MotelsModule } from '../motels/motels.module';

@Module({
  imports: [PrismaModule, MotelsModule],
  controllers: [MotelUtilityController],
  providers: [MotelUtilityService],
})
export class MotelUtilityModule {}
