import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Status,
  Transaction,
  TransactionType,
} from './entities/Transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDTO } from './DTOs/create-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async getTransactions(userId: string, page: number, limit: number) {
    const [data, total] = await this.transactionsRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getExpenses(userId: string, page: number, limit: number) {
    const [data, total] = await this.transactionsRepository.findAndCount({
      where: { userId, transactionType: TransactionType.EXPENSE },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getIncomes(userId: string, page: number, limit: number) {
    const [data, total] = await this.transactionsRepository.findAndCount({
      where: { userId, transactionType: TransactionType.INCOME },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return await this.transactionsRepository.findOneBy({ id });
  }

  async createTransaction(
    userId: string,
    dto: CreateTransactionDTO,
  ): Promise<Transaction> {
    const newTransaction = this.transactionsRepository.create({
      ...dto,
      userId,
    });

    return await this.transactionsRepository.save(newTransaction);
  }

  async refundTransaction(transaction: Transaction): Promise<Transaction> {
    if (transaction.status === Status.PAID) {
      transaction.status = Status.REFUNDED;
    } else {
      transaction.status = Status.PAID;
    }
    return await this.transactionsRepository.save(transaction);
  }

  async deleteTransaction(transaction: Transaction): Promise<Transaction> {
    await this.transactionsRepository.delete(transaction.id);
    return transaction;
  }
}
