import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import { getTransactions } from '../api/api';
import type { TransactionsResponse } from '../api/types.type';
import { DollarSign, Dot, TrendingDown, TrendingUp } from 'lucide-react';
import Transaction from '../components/Transaction';

export default function Transactions() {
  const { user } = useAuth();
  const [transactionsData, setTransactions] =
    useState<TransactionsResponse | null>(null);
  const [incomeSelected, setIncomeSelected] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState(false);
  const [query, setQuery] = useState('');
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

  const transactions = useMemo(() => {
    if (incomeSelected && query.length !== 0) {
      return transactionsData?.transactions.filter(
        (t) =>
          t.transactionType === 'income' &&
          t.name.toLowerCase().includes(query.toLowerCase()),
      );
    } else if (expenseSelected && query.length !== 0) {
      return transactionsData?.transactions.filter(
        (t) =>
          t.transactionType === 'expense' &&
          t.name.toLowerCase().includes(query.toLowerCase()),
      );
    } else if (incomeSelected) {
      return transactionsData?.transactions.filter(
        (t) => t.transactionType === 'income',
      );
    } else if (expenseSelected) {
      return transactionsData?.transactions.filter(
        (t) => t.transactionType === 'expense',
      );
    } else if (!incomeSelected && !expenseSelected && query.length > 0) {
      return transactionsData?.transactions.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()),
      );
    } else return transactionsData?.transactions;
  }, [incomeSelected, expenseSelected, transactionsData, query]);

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
            <span className="text-muted-foreground text-sm">Total Income</span>
            <span className="text-primary font-bold text-2xl">
              {transactionsData?.income.toLocaleString('en-US', {
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
            <span className="text-muted-foreground text-sm">Total Expense</span>
            <span className="text-[#e95f63] font-bold text-2xl">
              -
              {transactionsData?.expense.toLocaleString('en-US', {
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
            <span className="text-muted-foreground text-sm">Net Balance</span>
            <span
              className={`font-bold text-2xl ${transactionsData?.balance && transactionsData?.balance > 0 ? 'text-primary' : 'text-[#e95f63]'}`}
            >
              {transactionsData?.balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex mt-8 w-full max-w-250 self-center justify-between border-b border-border pb-8">
        <input
          type="text"
          placeholder="Search transactions..."
          className="py-2 px-5 border-border border rounded-xl hover:shadow-md transaction-all duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => {
            setIncomeSelected((prev) => !prev);
            setExpenseSelected(false);
          }}
          className={`${incomeSelected && 'bg-primary text-white'} flex items-center border-border border py-2 px-2 pr-4 rounded-xl cursor-pointer hover:shadow-md transaction-all duration-200`}
        >
          <Dot
            size={30}
            className={`${incomeSelected ? 'text-white' : 'text-primary'}`}
          />
          Income
        </button>
        <button
          onClick={() => {
            setExpenseSelected((prev) => !prev);
            setIncomeSelected(false);
          }}
          className={`${expenseSelected && 'bg-[#e95f63] text-white'} flex items-center border-border border py-2 px-2 pr-4 rounded-xl cursor-pointer hover:shadow-md transaction-all duration-200`}
        >
          <Dot
            size={30}
            className={`${expenseSelected ? 'text-white' : 'text-[#e95f63]'}`}
          />
          Expense
        </button>
      </div>

      <div className="grid grid-cols-1fr gap-4 items-center w-full max-w-300 self-center">
        {transactions
          ?.map((t) => (
            <Transaction
              key={t.id}
              category={t.category}
              name={t.name}
              type={t.transactionType}
              date={t.createdAt}
              amount={t.price}
            />
          ))
          .reverse()}
      </div>
    </section>
  );
}
