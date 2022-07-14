import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from './motel.entity';
import { MotelsService } from './motels.service';
import { MotelsController } from './motels.controller';
import { AddressesModule } from '../addresses/addresses.module';
import { RenterMotelModule } from '../renter-motel/renter-motel.module';
import { MotelUtilityModule } from '../motel-utility/motel-utility.module';
import { UsersModule } from '../users/users.module';
import { AppModule } from '../app.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Motel]),
    AddressesModule,
    RenterMotelModule,
    MotelUtilityModule,
    UsersModule,
    AwsModule,
  ],
  exports: [MotelsService],
  providers: [MotelsService],
  controllers: [MotelsController],
})
export class MotelsModule {}
