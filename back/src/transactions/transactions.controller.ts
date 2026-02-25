import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import {
  Transaction,
  TransactionPageResponse,
} from './entities/Transaction.entity';
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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
    @Query('search') search?: string,
  ): Promise<TransactionPageResponse> {
    return await this.transactionsService.getTransactions(
      user.sub,
      +page,
      +limit,
      filter,
      search,
    );
  }

  @Get('/expenses')
  public async getExpenses(
    @CurrentUser() user: Payload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<TransactionPageResponse> {
    return await this.transactionsService.getExpenses(user.sub, +page, +limit);
  }

  @Get('/incomes')
  public async getIncomes(
    @CurrentUser() user: Payload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<TransactionPageResponse> {
    return await this.transactionsService.getIncomes(user.sub, +page, +limit);
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
