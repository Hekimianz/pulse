import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/Subscription.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSub } from './DTOs/create-sub.dto';

@Injectable()
export class SubscriptionsRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  async findSubs(userId: string, page: number, limit: number, search?: string) {
    const [data, total] = await this.subscriptionRepo.findAndCount({
      where: {
        user: { id: userId },
        ...(search && { name: ILike(`%${search}%`) }),
      } as FindOptionsWhere<Subscription>,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, totalPages: Math.ceil(total / limit) };
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
