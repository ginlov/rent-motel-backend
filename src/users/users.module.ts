import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressesModule } from '../addresses/addresses.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [PrismaModule],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
