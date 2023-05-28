import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsEventDTO } from '../dto/update-stock-from-order-event.dto';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async subtractStockInBatch(items: OrderItemsEventDTO[]): Promise<void> {
    const productUUIDs = items.map((item) => item.product_uuid);
    const stocks = await this.stockRepository
      .createQueryBuilder('stock')
      .innerJoinAndSelect('stock.product', 'product')
      .where('product.product_uuid IN (:...productUUIDs)', { productUUIDs })
      .getMany();

    stocks.forEach((stock) => {
      const item = items.find(
        (item) => item.product_uuid === stock.product.product_uuid,
      );
      if (item) {
        stock.quantity -= item.quantity;
        this.stockRepository.save(stock);
      }
    });
  }

  async subtractStockByProductUUID(
    productUUID: string,
    quantityToSubtract: number,
  ): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      relations: ['product'],
      where: { 'product.product_uuid': productUUID },
    });

    if (stock) {
      stock.quantity -= quantityToSubtract;
      return this.stockRepository.save(stock);
    }

    return null;
  }
}
