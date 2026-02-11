import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChartColumn,
  ChartPie,
  Check,
  ChevronRight,
  CreditCard,
  DollarSign,
  Search,
  Shield,
  TrendingUp,
} from 'lucide-react';

export default function Home() {
  return (
    <section className="flex flex-1 flex-col px-10 pt-5">
      <section className="flex flex-col items-center">
        <h1 className="py-5 text-4xl w-70 font-bold text-center">
          Take Control of Your <span className="text-primary">Finances</span>
        </h1>
        <p className="leading-[30px] text-muted-foreground text-lg w-full pb-10 text-center">
          Track expesnses, manage subscriptions, and stay on budget - all in one
          place. Pulse helps you understand where your money goes and make
          smarter financial decisions.
        </p>
        <button className="cursor-pointer rounded-md bg-primary text-center px-8 py-2 text-lg font-bold text-white transition-colors hover:bg-primary/90 flex justify-center items-center">
          Get Started Free <ChevronRight />
        </button>
        <div className="flex text-sm items-center justify-between w-full max-w-150 mt-10">
          <div className="flex gap-1 text-muted-foreground">
            <Check size={20} className="text-primary" />
            No Credit Card Required
          </div>
          <div className="flex gap-1 text-muted-foreground">
            <Check size={20} className="text-primary" />
            No Sketchy Data Permission
          </div>
        </div>
      </section>
      <section className="bg-white flex flex-col shadow-xl rounded-xl py-5 px-5 mt-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-muted-foreground">Total Balance</span>
            <p className="text-xl font-bold">$12,846.50</p>
          </div>
          <span className="flex gap-2 text-sm text-primary bg-muted-primary w-fit px-3 py-1 rounded-xl items-center">
            <TrendingUp size={20} /> +12.5%
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <div className="shadow flex items-center gap-3 w-50 bg-[#fafbfb] border-border border px-5 py-3 rounded-lg">
            <ArrowUpRight
              size={30}
              className="bg-muted-primary text-primary rounded p-1"
            />
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm mb-[-5px]">
                Income
              </span>
              <p>$4,250</p>
            </div>
          </div>
          <div className="shadow flex items-center gap-3 w-50 bg-[#fafbfb] border-border border px-5 py-3 rounded-lg">
            <ArrowDownLeft
              size={30}
              className="bg-[#fae9e8] text-[#f04b4b] rounded p-1"
            />
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm mb-[-5px]">
                Expenses
              </span>
              <p>$2,180</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-border rounded-md shadow mt-4 py-3 gap-2 items-center">
          <div className="flex items-center mt-4 rounded px-5 gap-2">
            <CreditCard size={20} className="text-primary" />{' '}
            <p>Active Subscriptions</p>
          </div>
          <div className="flex items-center gap-2 rounded px-5 py-3 bg-[#fafbfb] w-90">
            <DollarSign
              size={30}
              className="bg-muted-primary rounded-2xl text-primary p-1"
            />
            <div className="flex flex-col">
              <span>Netflix</span>
              <span className="text-sm text-muted-foreground mt-[-5px]">
                Entertainment
              </span>
            </div>
            <span className="ml-auto">$15.99</span>
          </div>
          <div className="flex items-center gap-2 rounded px-5 py-3 bg-[#fafbfb] w-90">
            <DollarSign
              size={30}
              className="bg-muted-primary rounded-2xl text-primary p-1"
            />
            <div className="flex flex-col">
              <span>Spotify</span>
              <span className="text-sm text-muted-foreground mt-[-5px]">
                Entertainment
              </span>
            </div>
            <span className="ml-auto">$9.99</span>
          </div>
          <div className="flex items-center gap-2 rounded px-5 py-3 bg-[#fafbfb] w-90">
            <DollarSign
              size={30}
              className="bg-muted-primary rounded-2xl text-primary p-1"
            />
            <div className="flex flex-col">
              <span>AWS</span>
              <span className="text-sm text-muted-foreground mt-[-5px]">
                Software
              </span>
            </div>
            <span className="ml-auto">$45.00</span>
          </div>
          <div className="flex  items-center gap-2 rounded px-5 py-3 bg-[#fafbfb] w-90">
            <DollarSign
              size={30}
              className="bg-muted-primary rounded-2xl text-primary p-1"
            />
            <div className="flex flex-col">
              <span>Gym</span>
              <span className="text-sm text-muted-foreground mt-[-5px]">
                Health
              </span>
            </div>
            <span className="ml-auto">$29.99</span>
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-1">
          <div className="flex items-center justify-between">
            <h3>Monthly Budget</h3>
            <span className="text-muted-foreground">$2,180 / $3,000</span>
          </div>
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full "
                style={{ width: `${27}%` }}
              />
            </div>
          </div>
          <span className="text-muted-foreground">
            27% remaining this month
          </span>
        </div>
      </section>
      <section className="flex flex-col items-center text-center mt-15">
        <h2 className="text-3xl font-bold w-100">
          Everything you need to manage your money
        </h2>
        <p className="text-muted-foreground mt-4 w-full ">
          Pulse brings all your financial tools together in one beautiful,
          easy-to-use app.
        </p>

        <div className="group border border-border shadow rounded-md flex items-start mt-8 gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="group-hover:bg-primary/20 transition-all duration-200 bg-muted-primary text-primary rounded p-3 w-fit">
            <Search />
          </span>
          <h4 className="font-bold text-lg">Smart Expense Tracking</h4>
          <p className="text-muted-foreground text-start">
            Log income and expenses with categories, search, and powerful
            filters. Easily find any transaction in seconds.
          </p>
        </div>
        <div className="group border border-border shadow rounded-md flex mt-8 items-start gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="bg-muted-primary text-primary rounded p-3 w-fit group-hover:bg-primary/20 transition-all duration-200">
            <CreditCard />
          </span>
          <h4 className="font-bold text-lg">Subscription Management</h4>
          <p className="text-muted-foreground text-start">
            Never miss a payment. Track all your recurring charges in one place
            with renewal reminders and cost insights.
          </p>
        </div>
        <div className="group border border-border shadow rounded-md flex items-start mt-8 gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="bg-muted-primary text-primary rounded p-3 w-fit group-hover:bg-primary/20 transition-all duration-200">
            <ChartPie />
          </span>
          <h4 className="font-bold text-lg">Budget Insights</h4>
          <p className="text-muted-foreground text-start">
            Set monthly budgets and get visual progress tracking with beautiful
            charts and actionable recommendations.
          </p>
        </div>
        <div className="group border border-border shadow rounded-md flex mt-8 items-start gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="bg-muted-primary text-primary rounded p-3 w-fit group-hover:bg-primary/20 transition-all duration-200">
            <ChartColumn />
          </span>
          <h4 className="font-bold text-lg">Spending Analytics</h4>
          <p className="text-muted-foreground text-start">
            Understand your spending patterns with detailed breakdowns by
            category, time period, and merchant.
          </p>
        </div>
        <div className="group border border-border shadow rounded-md flex items-start mt-8 gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="bg-muted-primary text-primary rounded p-3 w-fit group-hover:bg-primary/20 transition-all duration-200">
            <Bell />
          </span>
          <h4 className="font-bold text-lg">Smart Alerts</h4>
          <p className="text-muted-foreground text-start">
            Get notified when bills are due, budgets are exceeded, or unusual
            spending is detected.
          </p>
        </div>
        <div className="group border border-border shadow rounded-md flex mt-8 items-start gap-3 flex-col w-full px-8 py-4 hover:shadow-lg transition-all duration-200">
          <span className="bg-muted-primary text-primary rounded p-3 w-fit group-hover:bg-primary/20 transition-all duration-200">
            <Shield />
          </span>
          <h4 className="font-bold text-lg">Bank-Level Security</h4>
          <p className="text-muted-foreground text-start">
            Your data is encrypted and protected with the same security
            standards used by major banks.
          </p>
        </div>
      </section>
      <section className="flex flex-col bg-primary text-white w-[100vw] -mx-10 text-center items-center gap-5 py-8 mt-10">
        <h3 className="text-3xl font-bold">
          Ready to take control of your finances?
        </h3>
        <p className="text-white/80 w-120">
          Join thousands of users who are already saving more and stressing less
          about money.
        </p>
        <button className="cursor-pointer rounded-md bg-white text-center text-primary px-8 py-2 text-lg font-bold transition-colors hover:bg-white/90 flex justify-center items-center">
          Get Started Free <ChevronRight />
        </button>
        <p className="text-sm text-white/80">
          No credit card required. 100% free. Always.
        </p>
      </section>
    </section>
  );
}
