import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { DashboardResponse } from './dashboard.type';

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
}
