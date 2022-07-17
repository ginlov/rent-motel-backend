import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findOne(roleWhereInput: Prisma.RoleWhereInput) {
    return await this.prisma.role.findFirst({
      where: roleWhereInput,
    });
  }
}
