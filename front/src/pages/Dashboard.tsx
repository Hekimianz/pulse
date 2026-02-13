import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import Card from '../components/Card';

const today = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <section className="flex flex-col flex-1 items-center py-5 pb-15 ">
      <h1 className="font-bold text-2xl">Welcome {user?.firstName}!</h1>
      <span className="text-muted-foreground text-md">{today}</span>
      <div className="flex gap-2 mt-4 border-b border-border w-full justify-center pb-4">
        <button className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90">
          Go to transactions
        </button>
        <button className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90">
          Manage subscriptions
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-10 pt-10">
        <Card
          title="monthly balance"
          balance={-8198.23}
          type="monthlyBalance"
        />
        <Card
          title="expenses"
          balance={10136.98}
          avgExp={779.77}
          type="expenses"
        />
        <Card title="income" balance={10136.98} avgExp={779.77} type="income" />
        <Card
          title="remaining budget"
          balance={89863.02}
          budgetPercUsed={10.1}
          type="remBudget"
        />
        <Card
          title="budget overview"
          budgetPercUsed={10.1}
          avgExp={779.77}
          type="budgetOverview"
          largestExpense={{
            id: '12',
            name: 'Groceries',
            price: 123.99,
            category: 'Housing',
            createdAt: '12',
            userId: '1',
            status: '1',
            transactionType: 'expense',
          }}
        />
        <Card
          title="subscriptions"
          monthlySubs={129.96}
          mostExpSub={{
            id: '1',
            name: 'Gym',
            price: 29.99,
            category: '1',
            createdAt: '1',
            userId: '1',
            active: true,
            subLength: 'Weekly',
          }}
          yearlySubs={1559.52}
          subsPercOfBudget={0.13}
          type="subscriptions"
        />
      </section>
    </section>
  );
}
