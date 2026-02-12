import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';
import { JwtAuth } from 'src/auth/guards/jwt.guard';

@Controller('dashboard')
@UseGuards(JwtAuth)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/expenses')
  public async getExpenses(@CurrentUser() user: Payload): Promise<number> {
    return await this.dashboardService.getExpenses(user.sub);
  }

  @Get('/incomes')
  public async getIncomes(@CurrentUser() user: Payload): Promise<number> {
    return await this.dashboardService.getIncomes(user.sub);
  }

  @Get('/balance')
  public async getBalance(@CurrentUser() user: Payload): Promise<number> {
    return await this.dashboardService.getBalance(user.sub);
  }

  @Get('/remainingBudget')
  public async getRemainingBudget(
    @CurrentUser() user: Payload,
  ): Promise<number> {
    return await this.dashboardService.getRemainingBudget(user.sub);
  }
}
