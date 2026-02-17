import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getTransactions } from '../api/api';
import type { TransactionsResponse } from '../api/types.type';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionsResponse | null>(
    null,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="flex flex-col flex-1 items-start py-5 pb-15 px-5 ">
      <h1 className="font-bold text-2xl ">Transactions</h1>
      <span className="text-muted-foreground">
        Track and manage all your income and expenses
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 self-center mt-8">
        <div className="w-90 md:max-w-60 flex border border-border items-center gap-3 rounded-lg shadow-sm px-3 py-3">
          <span className="bg-muted-primary text-primary p-3 rounded-xl">
            <TrendingUp />
          </span>
          <div className="flex flex-col ">
            <span className="text-muted-foreground">Total Income</span>
            <span className="text-primary font-bold text-xl">
              {transactions?.income.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
        </div>
        <div className="w-90 md:max-w-60 flex border border-border items-center gap-3 rounded-lg shadow-sm px-3 py-3">
          <span className="bg-[#e95f63]/20 text-[#e95f63] p-3 rounded-xl">
            <TrendingDown />
          </span>
          <div className="flex flex-col ">
            <span className="text-muted-foreground">Total Expense</span>
            <span className="text-[#e95f63] font-bold text-xl">
              -
              {transactions?.expense.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
        </div>
        <div className="w-90 md:max-w-60 flex border border-border items-center gap-3 rounded-lg shadow-sm px-3 py-3">
          <span className="bg-muted-primary text-primary p-3 rounded-xl">
            <DollarSign />
          </span>
          <div className="flex flex-col ">
            <span className="text-muted-foreground">Net Balance</span>
            <span
              className={`font-bold text-xl ${transactions?.balance && transactions?.balance > 0 ? 'text-primary' : 'text-[#e95f63]'}`}
            >
              {transactions?.balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
