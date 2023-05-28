import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'stock' })
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  stock_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.stock)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
