import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/Subscription.entity';
import { Repository } from 'typeorm';
import { CreateSub } from './DTOs/create-sub.dto';

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  async findSubs(userId: string): Promise<Subscription[]> {
    return await this.subscriptionRepo.find({ where: { userId } });
  }

  async findSubById(subId: string): Promise<Subscription | null> {
    return await this.subscriptionRepo.findOne({ where: { id: subId } });
  }

  async createSub(userId: string, dto: CreateSub): Promise<Subscription> {
    const newSub = this.subscriptionRepo.create({
      ...dto,
      userId,
    });
    console.log(userId);
    return await this.subscriptionRepo.save(newSub);
  }

  async deleteSub(sub: Subscription): Promise<Subscription> {
    sub.active = false;
    return await this.subscriptionRepo.save(sub);
  }
}
