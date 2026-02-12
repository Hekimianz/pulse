import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async getExpenses(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    const transactions = await this.transactionsService.getExpenses(user.id);
    const expenses = transactions.reduce((sum, obj) => sum + +obj.price, 0);
    return expenses;
  }

  async getIncomes(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    const transactions = await this.transactionsService.getIncomes(user.id);
    const expenses = transactions.reduce((sum, obj) => sum + +obj.price, 0);
    return expenses;
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    const expenses = await this.getExpenses(user.id);
    const incomes = await this.getIncomes(user.id);
    return incomes - expenses;
  }

  async getRemainingBudget(userId: string): Promise<number> {
    const expenses = await this.getExpenses(userId);
    const user = await this.usersService.findById(userId);
    return +user.budget - expenses;
  }
}
