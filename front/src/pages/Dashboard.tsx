import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getDashboard } from '../api/api';
import type { DashboardResponse } from '../api/types.type';

const today = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="flex flex-col flex-1 items-center py-5 pb-15 ">
      <h1 className="font-bold text-2xl">Welcome {user?.firstName}!</h1>
      <span className="text-muted-foreground text-md">{today}</span>
      <div className="flex gap-2 mt-4 border-b border-border w-full justify-center pb-4">
        <Link to="/transactions">
          <button className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90">
            Go to transactions
          </button>
        </Link>
        <Link to="/subscriptions">
          <button className="cursor-pointer rounded-md bg-primary text-center px-3 py-2 text-md font-[700] text-white transition-colors hover:bg-primary/90">
            Manage subscriptions
          </button>
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-10 pt-10">
        <Card
          title="monthly balance"
          balance={dashboardData?.balance}
          type="monthlyBalance"
        />
        <Card
          title="expenses"
          balance={dashboardData?.expenses}
          avgExp={dashboardData?.avgSpentPerDay}
          type="expenses"
        />
        <Card title="income" balance={dashboardData?.incomes} type="income" />
        <Card
          title="remaining budget"
          balance={dashboardData?.remainingBudget}
          budgetPercUsed={dashboardData?.budgetPercentage}
          type="remBudget"
        />
        <Card
          title="budget overview"
          budgetPercUsed={dashboardData?.budgetPercentage}
          avgExp={dashboardData?.avgSpentPerDay}
          type="budgetOverview"
          largestExpense={dashboardData?.largestExpense}
        />
        <Card
          title="subscriptions"
          monthlySubs={dashboardData?.monthlySubs}
          mostExpSub={dashboardData?.mostExpensiveSub}
          yearlySubs={dashboardData?.yearlySubs}
          subsPercOfBudget={dashboardData?.subsPercentOfBudget}
          type="subscriptions"
        />
      </section>
    </section>
  );
}
