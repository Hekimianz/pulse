import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { Transaction } from './entities/Transaction.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';
import { CreateTransactionDTO } from './DTOs/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuth)
  @Get()
  public async getTransactions(
    @CurrentUser() user: Payload,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getTransactions(user.sub);
  }

  @UseGuards(JwtAuth)
  @Get(':id')
  public async getTransactionById(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.getTransactionById(id, user.sub);
  }

  @UseGuards(JwtAuth)
  @Post()
  public async createTransaction(
    @CurrentUser() user: Payload,
    @Body() dto: CreateTransactionDTO,
  ): Promise<Transaction> {
    return await this.transactionsService.createTransaction(user.sub, dto);
  }

  @UseGuards(JwtAuth)
  @Patch('/refund/:id')
  public async refundTransaction(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.refundTransaction(user.sub, id);
  }

  @UseGuards(JwtAuth)
  @Delete('/:id')
  public async deleteTransaction(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.deleteTransaction(user.sub, id);
  }
}
