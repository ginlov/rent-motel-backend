import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AddressesService],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
