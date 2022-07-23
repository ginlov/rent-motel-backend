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
import { UploadImageBill } from './dto/upload-image-bill.dto';
import { IResponse } from '../interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleEnum, User } from '@prisma/client';
import { MotelsService } from '../motels/motels.service';
import { Roles } from '../auth/decorators/role.decorator';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';

@Controller('transactions')
@ApiTags('Transaction')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private motelsService: MotelsService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.RENTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create transaction - RENTER' })
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
            id: motelId,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created transaction.',
    };
  }

  @Post('/upload-image-bill/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.RENTER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update image bill - RENTER' })
  async updateImageBill(
    @Param('id') id: string,
    @Body() uploadImageBill: UploadImageBill,
  ) {
    const transactionExisted = await this.transactionsService.findOne(id);
    if (!transactionExisted) {
      throw new BadRequestException('Transaction is invalid.');
    }

    return await this.transactionsService.update(id, {
      imageBill: uploadImageBill.imageUrl,
    });
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction list - ADMIN' })
  async findAll(): Promise<IResponse> {
    const transactions = await this.transactionsService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'Get transaction list successfully.',
      data: transactions,
    };
  }

  @Post('/confirm-transaction/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm transaction - ADMIN' })
  async confirmTransaction(
    @Param('id') id: string,
    @Body() confirmTransactionDto: ConfirmTransactionDto,
  ): Promise<IResponse> {
    const transactionExisted = await this.transactionsService.findOne(id);
    if (!transactionExisted) {
      throw new BadRequestException('Transaction is invalid.');
    }

    if (confirmTransactionDto.isConfirm) {
      await this.transactionsService.update(id, {
        isPaid: true,
      });
    } else {
      await this.transactionsService.remove(id);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Process successfully.',
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
