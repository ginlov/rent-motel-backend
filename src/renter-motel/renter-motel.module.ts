import { Module } from '@nestjs/common';
import { RenterMotelService } from './renter-motel.service';
import { RenterMotelController } from './renter-motel.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { MotelsModule } from '../motels/motels.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, MotelsModule, UsersModule],
  controllers: [RenterMotelController],
  providers: [RenterMotelService],
})
export class RenterMotelModule {}
