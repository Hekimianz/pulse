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
@UseGuards(JwtAuth)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  public async getTransactions(
    @CurrentUser() user: Payload,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getTransactions(user.sub);
  }

  @Get('/expenses')
  public async getExpenses(
    @CurrentUser() user: Payload,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getExpenses(user.sub);
  }

  @Get('/incomes')
  public async getIncomes(
    @CurrentUser() user: Payload,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getIncomes(user.sub);
  }

  @Get(':id')
  public async getTransactionById(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.getTransactionById(id, user.sub);
  }

  @Post()
  public async createTransaction(
    @CurrentUser() user: Payload,
    @Body() dto: CreateTransactionDTO,
  ): Promise<Transaction> {
    return await this.transactionsService.createTransaction(user.sub, dto);
  }

  @Patch('/refund/:id')
  public async refundTransaction(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.refundTransaction(user.sub, id);
  }

  @Delete('/:id')
  public async deleteTransaction(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Transaction> {
    return await this.transactionsService.deleteTransaction(user.sub, id);
  }
}
