import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Category {
  DAILY_LIVING = 'Daily Living',
  HOUSING = 'Housing',
  HEALTH_WELLNESS = 'Health & Wellness',
  ENTERTAINMENT_LIFESTYLE = 'Entertainment & Lifestyle',
  PERSONAL = 'Personal',
  FINANCIAL = 'Financial',
  FAMILY_SOCIAL = 'Family & Social',
  WORK_EDUCATION = 'Work & Education',
  TRAVEL = 'Travel',
  OTHER = 'Other',
}

export enum SubLength {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  ANNUAL = 'Annual',
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ type: 'enum', enum: SubLength })
  subLength: SubLength;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'bool', default: true })
  active: boolean;
}
