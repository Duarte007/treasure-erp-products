import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { StockRepository } from './repositories/stock.repository';
import { StockService } from './services/stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StockController],
  providers: [StockService, StockRepository],
})
export class StockModule {}
