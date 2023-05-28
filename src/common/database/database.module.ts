import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../modules/products/entities/product.entity';
import { Stock } from '../../modules/stock/entities/stock.entity';
import { DataBaseConnectionService } from './typeorm.config';

const DATABASE_ENTITIES = [Product, Stock];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    TypeOrmModule.forFeature(DATABASE_ENTITIES),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
