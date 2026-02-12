import { Category } from 'src/subscriptions/entities/Subscription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
