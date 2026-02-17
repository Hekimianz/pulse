import type { ErrorResponse } from './auth';
import type { DashboardResponse, TransactionsResponse } from './types.type';

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

export async function getTransactions(): Promise<TransactionsResponse> {
  const token = localStorage.getItem('token');
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/dashboard/transactions`,
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
