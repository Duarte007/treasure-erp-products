import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PubSub } from '../../common/pubsub/pubsub.decorator';

@Controller('stock')
@ApiTags('stock')
export class StockController {
  @Post('order-event')
  @PubSub()
  updateProductsStockFromOrderEvent() {}
}
