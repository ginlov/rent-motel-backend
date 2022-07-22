import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MotelUtilityModule } from '../motel-utility/motel-utility.module';

@Module({
  imports: [PrismaModule, MotelUtilityModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
