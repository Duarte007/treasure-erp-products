import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PubSubGuard } from './pubsub.guard';

@Module({
  imports: [ConfigModule],
  providers: [PubSubGuard],
})
export class PubSubGuardModule {}
