import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from './motel.entity';
import { MotelsService } from './motels.service';
import { MotelsController } from './motels.controller';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Motel]), AddressesModule],
  exports: [MotelsService],
  providers: [MotelsService],
  controllers: [MotelsController],
})
export class MotelsModule {}
