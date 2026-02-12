import { Category } from 'src/subscriptions/entities/Subscription.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', scale: 2, precision: 10 })
  price: number;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: Status, default: Status.PAID })
  status: Status;

  @Column({ type: 'enum', enum: TransactionType })
  transactionType: TransactionType;
}
