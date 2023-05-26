import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: 'stock' })
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  stock_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.stock)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
