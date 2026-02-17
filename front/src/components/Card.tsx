import {
  ArrowDown,
  ArrowUp,
  BanknoteArrowDown,
  BanknoteArrowUp,
  CalendarDays,
  SearchAlert,
  Smartphone,
  Target,
} from 'lucide-react';
import type { Subscription, Transaction } from '../api/types.type';

interface PropsType {
  title: string;
  balance?: number;
  avgExp?: number;
  budgetPercUsed?: number;
  type: string;
  largestExpense?: Transaction | null;
  monthlySubs?: number;
  mostExpSub?: Subscription | null;
  yearlySubs?: number;
  subsPercOfBudget?: number;
  subsActive?: number;
}

export default function Card(props: PropsType) {
  const monthlyCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <CalendarDays />
        </span>
      </div>
      <span
        className={`mt-2 font-bold text-3xl ${props.balance! > 0 ? 'text-primary' : 'text-red-800'}`}
      >
        {props.balance !== 0 &&
          props.balance?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
      </span>
      {props.balance !== 0 ? (
        <>
          <span className=" text-muted-foreground">Income - Expenses</span>
          <span
            className={`flex gap-2 items-center text-sm mt-4 ${props.balance! > 0 ? 'text-primary' : 'text-red-800'}`}
          >
            {props.balance! > 0 ? (
              <ArrowUp size={17} />
            ) : (
              <ArrowDown size={17} />
            )}
            {props.balance! > 0
              ? 'Income exceeds expenses'
              : 'Expenses exceed income'}
          </span>
        </>
      ) : (
        <span className="text-muted-foreground">
          You have no transactions yet.
        </span>
      )}
    </>
  );
  const expensesCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <BanknoteArrowDown />
        </span>
      </div>
      <span className="mt-2 font-bold text-3xl text-primary">
        {props.balance?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      <span className="text-muted-foreground">This month</span>
      <span>
        Avg per day{' '}
        {props.avgExp?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    </>
  );
  const incomeCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <BanknoteArrowUp />
        </span>
      </div>
      <span className="mt-2 font-bold text-3xl text-primary">
        {props.balance?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      <span className="text-muted-foreground">This month</span>
    </>
  );
  const remBudgetCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <Target />
        </span>
      </div>
      <span className="mt-2 font-bold text-3xl text-primary">
        {props.balance?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      <span className="text-muted-foreground">
        {100 - props.budgetPercUsed!}% remaining
      </span>
      <div className="w-full my-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${props.budgetPercUsed}%` }}
        />
      </div>
      <span className="text-muted-foreground">
        {props.budgetPercUsed}% of budget used
      </span>
    </>
  );
  const budgetOverviewCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <SearchAlert />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1 w-50 bg-muted rounded-xl py-5">
          <span className="text-primary font-bold text-xl">
            {props.budgetPercUsed}%
          </span>
          <span className="text-muted-foreground text-sm">BUDGET USED</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-50 bg-muted rounded-xl py-5">
          <span className="text-primary font-bold text-xl">
            {props.avgExp?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
          <span className="text-muted-foreground text-sm">AVG DAILY SPENT</span>
        </div>
      </div>
      {props.largestExpense && (
        <div className="flex justify-between mt-6 text-muted-foreground">
          <h3>Largest Expense</h3>
          <div className="flex flex-col items-end">
            <span>
              {Number(props.largestExpense?.price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <span>
              {props.largestExpense?.name} • {props.largestExpense?.category}
            </span>
          </div>
        </div>
      )}
    </>
  );
  const subscriptionsCard = (
    <>
      <div className="flex justify-between items-center min-h-15">
        <h2 className="font-bold text-lg">{props.title.toUpperCase()}</h2>
        <span className="text-primary bg-primary/10 p-2 rounded-lg">
          <Smartphone />
        </span>
      </div>
      {props.mostExpSub ? (
        <>
          <span className="mt-2 font-bold text-3xl text-primary">
            {props.monthlySubs?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
          <span className="text-muted-foreground">
            Monthly cost • {props.subsActive} active
          </span>
          <div className="flex text-muted-foreground border-b border-border items-center justify-between py-2">
            <h3>Most Expensive</h3>
            <div className="flex flex-col items-end">
              <span>
                {Number(props.mostExpSub?.price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
              <span>
                {props.mostExpSub?.name} • {props.mostExpSub?.subLength}
              </span>
            </div>
          </div>
          <div className="flex text-muted-foreground border-b border-border items-center justify-between py-4">
            <h3>Yearly Total</h3>
            <span>
              {props.yearlySubs?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
          <div className="flex text-muted-foreground border-b border-border items-center justify-between py-4">
            <h3>% of Budget</h3>
            <span>{props.subsPercOfBudget}%</span>
          </div>
        </>
      ) : (
        <span className="text-muted-foreground">
          You have no subscriptions yet
        </span>
      )}
    </>
  );
  let activeCard = null;
  switch (props.type) {
    case 'monthlyBalance':
      activeCard = monthlyCard;
      break;
    case 'expenses':
      activeCard = expensesCard;
      break;
    case 'income':
      activeCard = incomeCard;
      break;
    case 'remBudget':
      activeCard = remBudgetCard;
      break;
    case 'budgetOverview':
      activeCard = budgetOverviewCard;
      break;
    case 'subscriptions':
      activeCard = subscriptionsCard;
      break;
    default:
      activeCard = '';
      break;
  }
  return (
    <section
      className={`flex border border-border flex-col w-full px-5 py-5 bg-white shadow-lg rounded-xl max-w-150 ${props.type === 'budgetOverview' || props.type === 'subscriptions' ? 'md:col-span-2' : ''}`}
    >
      {activeCard}
    </section>
  );
}
