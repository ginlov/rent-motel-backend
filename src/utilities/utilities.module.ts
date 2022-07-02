import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';
import { Utility } from './utility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utility])],
  exports: [UtilitiesService],
  providers: [UtilitiesService],
  controllers: [UtilitiesController],
})
export class UtilitiesModule {}
