import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionsRepository } from './subscriptions.repository';
import { Subscription } from './entities/Subscription.entity';
import { CreateSub } from './DTOs/create-sub.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
  ) {}

  async findSubs(userId: string): Promise<Subscription[]> {
    return await this.subscriptionsRepository.findSubs(userId);
  }

  async findSubById(userId: string, subId: string): Promise<Subscription> {
    const sub = await this.subscriptionsRepository.findSubById(subId);
    if (!sub)
      throw new NotFoundException(
        `No sub with an id of ${subId} has been found`,
      );
    if (sub.userId !== userId)
      throw new UnauthorizedException('Can only fetch your own subs');
    return sub;
  }

  async createSub(userId: string, dto: CreateSub): Promise<Subscription> {
    return await this.subscriptionsRepository.createSub(userId, dto);
  }

  async deleteSub(userId: string, id: string): Promise<Subscription> {
    const sub = await this.findSubById(userId, id);
    if (!sub.active) throw new ConflictException('Sub already canceled');
    return await this.subscriptionsRepository.deleteSub(sub);
  }
}
