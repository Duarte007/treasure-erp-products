import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenAuthQueryParam } from 'src/common/dtos/token-auth-qs.dto';
import { PubsubPostBody } from '../../common/pubsub/interfaces/pubsub-post-body';
import { PubSub } from '../../common/pubsub/pubsub.decorator';
import { OrderEventDTO } from './dto/update-stock-from-order-event.dto';
import { StockService } from './services/stock.service';

@Controller('stock')
@ApiTags('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('order-event')
  @PubSub()
  updateProductsStockFromOrderEvent(
    @Body() orderEvent: PubsubPostBody,
    @Query() params: TokenAuthQueryParam,
  ) {
    const orderEventDto: OrderEventDTO = orderEvent.message
      .data as unknown as OrderEventDTO;

    return this.stockService.updateProductsStockFromOrderEvent(orderEventDto);
  }
}
