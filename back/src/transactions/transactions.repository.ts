import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, Transaction } from './entities/Transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDTO } from './DTOs/create-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async getTransactions(userId: string): Promise<Transaction[]> {
    return await this.transactionsRepository.find({ where: { userId } });
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
