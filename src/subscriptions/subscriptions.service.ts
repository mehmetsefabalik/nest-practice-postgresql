import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { Subscription } from './subscriptions.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  create(createDto: CreateDto): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.name = createDto.name;
    subscription.email = createDto.email;
    subscription.frequency = createDto.frequency;
    subscription.isVerified = createDto.isVerified;
    subscription.country = createDto.country;

    return this.subscriptionsRepository.save(subscription);
  }

  findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({});
  }

  findOne(id: string): Promise<Subscription> {
    return this.subscriptionsRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<Subscription> {
    return this.subscriptionsRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionsRepository.delete(id);
  }
}
