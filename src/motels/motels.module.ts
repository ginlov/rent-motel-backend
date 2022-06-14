import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from './motel.entity';
import { MotelsService } from './motels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Motel])],
  providers: [MotelsService],
})
export class MotelsModule {}
