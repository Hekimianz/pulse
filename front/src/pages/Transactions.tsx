import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getTransactions } from '../api/api';
import type { TransactionsResponse } from '../api/types.type';
import { DollarSign, Dot, TrendingDown, TrendingUp } from 'lucide-react';
import TransactionComp from '../components/Transaction';

export default function Transactions() {
  const { user } = useAuth();
  const [transactionsData, setTransactions] =
    useState<TransactionsResponse | null>(null);
  const [incomeSelected, setIncomeSelected] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const currPage = transactionsData?.transactions.page;
  const totalPages = transactionsData?.transactions.totalPages;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const filter = incomeSelected
        ? 'income'
        : expenseSelected
          ? 'expense'
          : undefined;
      try {
        const data = await getTransactions(page, filter, debouncedQuery);
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, incomeSelected, expenseSelected, debouncedQuery]);

  const transactions = transactionsData?.transactions.data;

  return (
    <section className="flex flex-col flex-1 items-center py-5 pb-15 px-5 ">
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

      <div className="grid grid-cols-1fr md:grid-cols-4 mt-8 w-full max-w-250 self-center border-b border-border pb-8 gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="py-2 px-5 border-border border rounded-xl hover:shadow-md transaction-all duration-200"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <button
          onClick={() => {
            setIncomeSelected((prev) => !prev);
            setExpenseSelected(false);
            setPage(1);
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
            setPage(1);
          }}
          className={`${expenseSelected && 'bg-[#e95f63] text-white'} flex items-center border-border border py-2 px-2 pr-4 rounded-xl cursor-pointer hover:shadow-md transaction-all duration-200`}
        >
          <Dot
            size={30}
            className={`${expenseSelected ? 'text-white' : 'text-[#e95f63]'}`}
          />
          Expense
        </button>
        <Link className="text-center" to={'/transactions/create'}>
          <button
            className={`bg-primary/0 text-foreground border-border border py-2 px-4 rounded-xl cursor-pointer hover:shadow-md transaction-all duration-200 hover:bg-primary hover:text-white`}
          >
            Add Transaction
          </button>
        </Link>
      </div>

      <div className="flex flex-col w-full max-w-5xl mt-4 ">
        {transactions && transactions?.length > 0 ? (
          transactions?.map((t) => (
            <TransactionComp
              key={t.id}
              category={t.category}
              name={t.name}
              type={t.transactionType}
              date={t.createdAt}
              amount={t.price}
            />
          ))
        ) : (
          <span className="text-muted-foreground text-center">
            There are no transactions to show
          </span>
        )}
      </div>
      <div className="flex gap-2 self-center mt-8">
        {Array.from({ length: totalPages! }, (_, i) => (
          <button
            className={`cursor-pointer hover:opacity-80 transition-all duration-100 px-2 rounded ${currPage === i + 1 ? 'bg-primary text-white' : 'bg-muted-foreground/40 text-foreground'}`}
            key={i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
