import { DollarSign } from 'lucide-react';

interface PropsType {
  name: string;
  category: string;
  type: string;
  date: string;
  amount: string;
}
export default function Transaction({
  name,
  category,
  type,
  date,
  amount,
}: PropsType) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="flex border-b border-border w-full items-center h-20 justify-between">
      <span
        className={`p-3 rounded-xl  ${type !== 'expense' ? 'bg-muted-primary text-primary' : 'bg-[#f7dddc] text-[#e95f63]'}`}
      >
        <DollarSign />
      </span>
      <div className="flex flex-col">
        <h3 className="max-w-30">{name}</h3>
        <span className="text-muted-foreground text-sm">{category}</span>
      </div>
      <span className="text-muted-foreground">{formattedDate}</span>
      <span className="text-lg">
        {`${type === 'expense' ? '-' : ''} ${Number(amount).toLocaleString(
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          },
        )}`}
      </span>
    </div>
  );
}
