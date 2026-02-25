import {
  Subscription,
  SubscriptionsPageResponse,
} from 'src/subscriptions/entities/Subscription.entity';
import {
  Transaction,
  TransactionPageResponse,
} from 'src/transactions/entities/Transaction.entity';

export interface DashboardResponse {
  expenses: number;
  incomes: number;
  balance: number;
  remainingBudget: number;
  budgetPercentage: number;
  isOverBudget: boolean;
  percentOverBudget: number | null;
  largestExpense: Transaction | null;
  avgSpentPerDay: number;
  monthlySubs: number;
  activeSubs: number;
  mostExpensiveSub: Subscription | null;
  yearlySubs: number;
  subsPercentOfBudget: number;
}

export interface TransactionsResponse {
  transactions: TransactionPageResponse;
  income: number;
  expense: number;
  balance: number;
}

export interface SubscriptionsResponse {
  subscriptions: SubscriptionsPageResponse;
  monthlySubs: number;
  yearlySubs: number;
  mostExpensiveSub: Subscription | null;
}
