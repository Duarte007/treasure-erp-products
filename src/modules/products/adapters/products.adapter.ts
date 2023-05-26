import { v4 as uuidv4 } from 'uuid';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductRecord } from '../entities/product.entity';

export class ProductAdapter {
  static toDatabase(productData: Partial<CreateProductDTO>): ProductRecord {
    return {
      product_name: productData.name,
      product_uuid: uuidv4(),
      product_description: productData.description,
      product_price: productData.price,
      quantity: productData.quantity,
    };
  }
}
