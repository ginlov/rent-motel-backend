import { Module } from '@nestjs/common';
import { MotelsService } from './motels.service';
import { MotelsController } from './motels.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressesModule } from '../addresses/addresses.module';
import { UsersModule } from '../users/users.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [PrismaModule, AddressesModule, UsersModule, AwsModule],
  controllers: [MotelsController],
  providers: [MotelsService],
})
export class MotelsModule {}
