import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { DashboardResponse, TransactionsResponse } from './dashboard.type';

@Controller('dashboard')
@UseGuards(JwtAuth)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/')
  public async getExpenses(
    @CurrentUser() user: Payload,
  ): Promise<DashboardResponse> {
    return await this.dashboardService.getDashboard(user.sub);
  }

  @Get('/transactions')
  public async getTransactions(
    @CurrentUser() user: Payload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
    @Query('search') search?: string,
  ): Promise<TransactionsResponse> {
    return await this.dashboardService.getTransaction(
      user.sub,
      +page,
      +limit,
      filter,
      search,
    );
  }

  @Get('/subscriptions')
  public async getSubscriptions(@CurrentUser() user: Payload) {
    return await this.dashboardService.getSubscriptions(user.sub);
  }
}
