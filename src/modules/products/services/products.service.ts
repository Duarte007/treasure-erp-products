import { Injectable } from '@nestjs/common';
import { ProductAdapter } from '../adapters/products.adapter';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDTO) {
    const productToSave = ProductAdapter.toDatabase(createProductDto);
    return this.productsRepository.addProductAndUpdateStock(productToSave);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDTO) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
