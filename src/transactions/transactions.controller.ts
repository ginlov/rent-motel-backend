import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { IResponse } from '../interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '@prisma/client';
import { MotelsService } from '../motels/motels.service';

@Controller('transactions')
@ApiTags('Transaction')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private motelsService: MotelsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const { motelId, ...transactionData } = createTransactionDto;

    const motelExisted = await this.motelsService.findOne(
      createTransactionDto.motelId,
    );
    if (!motelExisted) {
      throw new BadRequestException('Motel is not existed.');
    }

    await this.transactionsService.create({
      data: {
        ...transactionData,
        user: {
          connect: {
            id: user.id,
          },
        },
        motel: {
          connect: {
            id: createTransactionDto.motelId,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created transaction.',
    };
  }

  // @Get()
  // findAll() {
  //   return this.transactionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
