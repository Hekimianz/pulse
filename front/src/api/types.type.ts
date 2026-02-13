export interface Transaction {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  userId: string;
  status: string;
  transactionType: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  userId: string;
  active: boolean;
  subLength: string;
}
