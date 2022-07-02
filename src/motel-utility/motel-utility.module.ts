import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from '../addresses/addresses.module';
import { MotelsModule } from '../motels/motels.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { MotelUtilityController } from './motel-utility.controller';
import { MotelUtility } from './motel-utility.entity';
import { MotelUtilityService } from './motel-utility.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotelUtility]),
    forwardRef(() => MotelsModule),
    UtilitiesModule,
  ],
  exports: [MotelUtilityService],
  providers: [MotelUtilityService],
  controllers: [MotelUtilityController],
})
export class MotelUtilityModule {}
