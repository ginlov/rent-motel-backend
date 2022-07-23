import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MotelsModule } from '../motels/motels.module';
import { RenterMotelModule } from '../renter-motel/renter-motel.module';

@Module({
  imports: [PrismaModule, MotelsModule, RenterMotelModule],
  exports: [TransactionsService],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
