import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from '../addresses/addresses.module';
import { MotelUtility } from './motel-utility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotelUtility])],
  exports: [MotelUtility],
  providers: [MotelUtility],
  controllers: [MotelUtility],
})
export class MotelsModule {}
