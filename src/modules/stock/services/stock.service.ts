import { Injectable, Logger } from '@nestjs/common';
import { OrderEventDTO } from '../dto/update-stock-from-order-event.dto';
import { StockRepository } from '../repositories/stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async updateProductsStockFromOrderEvent(
    orderEventDto: OrderEventDTO,
  ): Promise<void> {
    Logger.log({ message: 'Updating stocks from order', orderEventDto });
    return this.stockRepository.subtractStockInBatch(orderEventDto.items);
  }
}
