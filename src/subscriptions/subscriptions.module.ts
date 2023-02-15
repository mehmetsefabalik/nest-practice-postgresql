import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionController } from './subscriptions.controller';
import { Subscription } from './subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
