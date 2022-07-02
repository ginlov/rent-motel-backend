import { Module, forwardRef } from '@nestjs/common';
import { RenterMotelService } from './renter-motel.service';
import { RenterMotelController } from './renter-motel.controller';
import { UsersModule } from '../users/users.module';
import { MotelsModule } from '../motels/motels.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenterMotel } from './renter-motel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RenterMotel]),
    forwardRef(() => MotelsModule),
  ],
  exports: [RenterMotelService],
  providers: [RenterMotelService],
  controllers: [RenterMotelController],
})
export class RenterMotelModule {}
