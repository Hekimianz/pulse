import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [TransactionsModule, SubscriptionsModule, UsersModule],
})
export class DashboardModule {}
