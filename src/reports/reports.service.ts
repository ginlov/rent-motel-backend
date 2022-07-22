import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}
  async create(createReportDto: CreateReportDto) {
    return await this.prisma.report.create({
      data: createReportDto,
    });
  }

  async findAll(reportFindManyArgs: Prisma.ReportFindManyArgs) {
    return await this.prisma.report.findMany(reportFindManyArgs);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} report`;
  // }

  async update(id: string) {
    return await this.prisma.report.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} report`;
  // }
}
