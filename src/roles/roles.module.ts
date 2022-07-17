import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesService } from './roles.service';

@Module({
  imports: [PrismaModule],
  exports: [RolesService],
  providers: [RolesService],
})
export class RolesModule {}
