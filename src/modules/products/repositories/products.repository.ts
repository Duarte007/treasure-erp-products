import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product, ProductRecord } from '../entities/product.entity';
import { Stock } from '../entities/stock.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Product)
    private stockRepository: Repository<Stock>,
  ) {}

  private _buildProductEntity(product: ProductRecord) {
    const productEntity = new Product();
    productEntity.product_name = product.product_name;
    productEntity.product_description = product.product_description;
    productEntity.product_price = product.product_price;
    return productEntity;
  }

  async addProductAndUpdateStock(productToSave: ProductRecord) {
    try {
      return this.productRepository.manager.transaction(
        async (transaction: EntityManager) => {
          const productEntity = this._buildProductEntity(productToSave);
          const savedProduct = await transaction.save(productEntity);

          await transaction.save(Stock, {
            product_id: savedProduct.product_id,
            quantity: productToSave.quantity,
          });

          return savedProduct;
        },
      );
    } catch (err) {
      Logger.error({
        message: err.detail,
        error: err.data,
      });
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
