import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(transactionCreateArgs: Prisma.TransactionCreateArgs) {
    return await this.prisma.transaction.create(transactionCreateArgs);
  }

  async findAll() {
    return await this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    transactionUpdateInput: Prisma.TransactionUpdateInput,
  ) {
    return await this.prisma.transaction.update({
      where: {
        id: id,
      },
      data: transactionUpdateInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.transaction.delete({
      where: {
        id: id,
      },
    });
  }
}
