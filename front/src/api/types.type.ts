export interface Transaction {
  id: string;
  name: string;
  price: string;
  category: string;
  createdAt: string;
  userId: string;
  status: string;
  transactionType: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: string;
  category: string;
  createdAt: string;
  userId: string;
  active: boolean;
  subLength: string;
}

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
  yearlySubs: number;
  activeSubs: number;
  mostExpensiveSub: Subscription | null;
  subsPercentOfBudget: number;
}

export interface TransactionsResponse {
  transactions: TransactionPage;
  balance: number;
  expense: number;
  income: number;
}

export interface TransactionPage {
  data: Transaction[];
  page: number;
  total: number;
  totalPages: number;
}

export interface CreateTransactionPayload {
  name: string;
  price: string;
  category: string;
  transactionType: string;
}
