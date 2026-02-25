import { DollarSign } from 'lucide-react';

interface PropsType {
  name: string;
  category: string;
  type: string;
  date: string;
  amount: string;
}

export default function TransactionComp({
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
    <div className="flex border-b border-border w-full items-center h-20">
      {/* Icon */}
      <div className="w-12 shrink-0">
        <span
          className={`p-3 rounded-xl flex items-center justify-center w-fit ${type !== 'expense' ? 'bg-muted-primary text-primary' : 'bg-[#f7dddc] text-[#e95f63]'}`}
        >
          <DollarSign />
        </span>
      </div>

      {/* Name + Category */}
      <div className="flex flex-col w-48 shrink-0 px-2">
        <h3 className="truncate font-medium" title={name}>
          {name}
        </h3>
        <span className="text-muted-foreground text-sm truncate">
          {category}
        </span>
      </div>

      {/* Date */}
      <div className="flex-1 text-muted-foreground text-sm">
        {formattedDate}
      </div>

      {/* Amount */}
      <div
        className={`shrink-0 text-right font-medium ml-auto ${type === 'expense' ? 'text-[#e95f63]' : 'text-primary'}`}
      >
        {`${type === 'expense' ? '-' : '+'}${Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
      </div>
    </div>
  );
}
