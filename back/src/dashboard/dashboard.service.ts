import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import {
  Transaction,
  TransactionType,
} from 'src/transactions/entities/Transaction.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { DashboardResponse } from './dashboard.type';
import {
  SubLength,
  Subscription,
} from 'src/subscriptions/entities/Subscription.entity';

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
    return +expenses.toFixed(2);
  }

  async getIncomes(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    const transactions = await this.transactionsService.getIncomes(user.id);
    const expenses = transactions.reduce((sum, obj) => sum + +obj.price, 0);
    return +expenses.toFixed(2);
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    const expenses = await this.getExpenses(user.id);
    const incomes = await this.getIncomes(user.id);
    return +(incomes - expenses).toFixed(2);
  }

  async getRemainingBudget(userId: string): Promise<number> {
    const expenses = await this.getExpenses(userId);
    const user = await this.usersService.findById(userId);
    return +(+user.budget - expenses).toFixed(2);
  }

  async getBudgetPercentage(userId: string): Promise<number> {
    const expenses = await this.getExpenses(userId);
    const user = await this.usersService.findById(userId);
    return +((expenses / +user.budget) * 100).toFixed(1);
  }
  async isOverBudget(userId: string): Promise<boolean> {
    const expenses = await this.getExpenses(userId);
    const user = await this.usersService.findById(userId);
    return expenses > +user.budget;
  }

  async percentOverBudget(userId: string): Promise<number | null> {
    const isOverBudget = await this.isOverBudget(userId);
    if (!isOverBudget) return null;
    const expenses = await this.getExpenses(userId);
    const user = await this.usersService.findById(userId);
    return +(((expenses - +user.budget) / +user.budget) * 100).toFixed(1);
  }

  async getLargestExpense(userId: string): Promise<Transaction> {
    const transactions = await this.transactionsService.getTransactions(userId);
    const expenses = transactions.filter(
      (trans) => trans.transactionType === TransactionType.EXPENSE,
    );
    return expenses.reduce((max, obj) => (obj.price > max.price ? obj : max));
  }

  async averageSpentPerDay(userId: string): Promise<number> {
    const daysPassed = new Date().getDate();
    const expenses = await this.getExpenses(userId);
    return +(expenses / daysPassed).toFixed(2);
  }

  async getMonthlySubs(userId: string): Promise<number> {
    const subs = await this.subscriptionsService.findSubs(userId);

    const monthlyTotal = subs
      .filter((sub) => sub.active)
      .reduce((total, sub) => {
        const price = +sub.price;

        switch (sub.subLength) {
          case SubLength.WEEKLY:
            return total + (price * 52) / 12;
          case SubLength.MONTHLY:
            return total + price;
          case SubLength.ANNUAL:
            return total + price / 12;
          default:
            return total + price;
        }
      }, 0);

    return +monthlyTotal.toFixed(2);
  }

  async totalActiveSubs(userId: string): Promise<number> {
    const subs = await this.subscriptionsService.findSubs(userId);
    return subs.filter((sub) => sub.active).length;
  }

  async mostExpensiveSub(userId: string): Promise<Subscription> {
    const subs = await this.subscriptionsService.findSubs(userId);
    const activeSubs = subs.filter((sub) => sub.active);
    return activeSubs.reduce((max, obj) => (obj.price > max.price ? obj : max));
  }

  async subscriptionPercentOfBudget(userId: string): Promise<number> {
    const subsTotal = await this.getMonthlySubs(userId);
    const user = await this.usersService.findById(userId);
    if (!user.budget || +user.budget === 0) return 0;
    return parseFloat(((subsTotal / +user.budget) * 100).toFixed(2));
  }

  async getDashboard(userId: string): Promise<DashboardResponse> {
    return {
      expenses: await this.getExpenses(userId),
      incomes: await this.getIncomes(userId),
      balance: await this.getBalance(userId),
      remainingBudget: await this.getRemainingBudget(userId),
      budgetPercentage: await this.getBudgetPercentage(userId),
      isOverBudget: await this.isOverBudget(userId),
      percentOverBudget: await this.percentOverBudget(userId),
      largestExpense: await this.getLargestExpense(userId),
      avgSpentPerDay: await this.averageSpentPerDay(userId),
      monthlySubs: await this.getMonthlySubs(userId),
      yearlySubs: (await this.getMonthlySubs(userId)) * 12,
      activeSubs: await this.totalActiveSubs(userId),
      mostExpensiveSub: await this.mostExpensiveSub(userId),
      subsPercentOfBudget: await this.subscriptionPercentOfBudget(userId),
    };
  }
}
