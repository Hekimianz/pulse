import type { ErrorResponse } from './auth';
import type {
  CreateTransactionPayload,
  DashboardResponse,
  Transaction,
  TransactionsResponse,
} from './types.type';

export async function getDashboard(): Promise<DashboardResponse> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: DashboardResponse = await res.json();
  return data;
}

export async function getTransactions(
  page: number = 1,
  filter?: string,
  search?: string,
): Promise<TransactionsResponse> {
  const token = localStorage.getItem('token');
  const params = new URLSearchParams({ page: String(page), limit: '10' });
  if (filter) params.set('filter', filter);
  if (search) params.set('search', search);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/transactions?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: TransactionsResponse = await res.json();
  return data;
}

export async function createTransaction(
  payload: CreateTransactionPayload,
): Promise<Transaction> {
  const token = localStorage.getItem('token');
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/transactions`,

    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...payload, price: Number(payload.price) }),
    },
  );
  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message);
  }
  const data: Transaction = await res.json();
  return data;
}
