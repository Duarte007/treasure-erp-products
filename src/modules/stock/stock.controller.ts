import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('stock')
export class StockController {
  @Post('order-event')
  updateProductsStockFromOrderEvent() {}
}
