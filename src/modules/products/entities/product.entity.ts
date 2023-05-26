import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Stock } from './stock.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_product_uuid')
  product_uuid: string;

  @Column({ length: 255 })
  product_name: string;

  @Column('text')
  product_description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  product_price: number;

  @OneToMany(() => Stock, (stock) => stock.product)
  stock: Stock[];
}

export interface ProductRecord {
  product_id?: string;
  product_uuid: string;
  product_name: string;
  product_description: string;
  product_price: number;
  quantity: number;
}
