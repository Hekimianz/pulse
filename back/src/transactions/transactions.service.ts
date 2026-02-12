import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from './entities/Transaction.entity';
import { CreateTransactionDTO } from './DTOs/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async getTransactions(userId: string): Promise<Transaction[]> {
    return await this.transactionsRepository.getTransactions(userId);
  }

  async getTransactionById(id: string, userId: string): Promise<Transaction> {
    const transaction =
      await this.transactionsRepository.getTransactionById(id);
    if (!transaction)
      throw new NotFoundException(
        `No transaction with an id of ${id} has been found`,
      );
    if (transaction.userId !== userId)
      throw new UnauthorizedException('Can only get your own transactions');
    return transaction;
  }

  async createTransaction(
    userId: string,
    dto: CreateTransactionDTO,
  ): Promise<Transaction> {
    return await this.transactionsRepository.createTransaction(userId, dto);
  }

  async refundTransaction(
    userId: string,
    tranId: string,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(tranId, userId);
    return await this.transactionsRepository.refundTransaction(transaction);
  }

  async deleteTransaction(
    userId: string,
    tranId: string,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(tranId, userId);
    return await this.transactionsRepository.deleteTransaction(transaction);
  }
}
