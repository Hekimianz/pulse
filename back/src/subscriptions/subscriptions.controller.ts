import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/Subscription.entity';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';
import { CreateSub } from './DTOs/create-sub.dto';

@Controller('subscriptions')
@UseGuards(JwtAuth)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  public async findSubs(
    @CurrentUser() user: Payload,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return await this.subscriptionsService.findSubs(
      user.sub,
      page,
      limit,
      search,
    );
  }

  @Get(':id')
  public async findSubById(
    @CurrentUser() user: Payload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Subscription> {
    return await this.subscriptionsService.findSubById(user.sub, id);
  }

  @Post()
  public async createSub(
    @CurrentUser() user: Payload,
    @Body() dto: CreateSub,
  ): Promise<Subscription> {
    return await this.subscriptionsService.createSub(user.sub, dto);
  }

  @Patch(':id')
  public async deleteSub(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: Payload,
  ): Promise<Subscription> {
    return await this.subscriptionsService.deleteSub(user.sub, id);
  }
}
