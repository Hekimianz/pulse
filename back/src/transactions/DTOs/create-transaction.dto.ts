import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category } from 'src/subscriptions/entities/Subscription.entity';
import { TransactionType } from '../entities/Transaction.entity';

export class CreateTransactionDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;
}
