import ProductModel, {
  ProductInputtableTypes, ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';

import { ServiceResponse } from '../types/ServiceResponse';

async function register(info: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  const { name, price, orderId } = info;
  if (!name || !price || !orderId) {
    return { status: 'INVALID_DATA',
      data: { message: 'Invalid data!' },
    };
  }
  const product = await ProductModel.create({ name, price, orderId });
  const responseInfo = {
    id: product.dataValues.id,
    name: product.dataValues.name,
    price: product.dataValues.price,
  } as Product;

  return { status: 'CREATED', data: responseInfo };
}

async function findAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return {
    status: 'SUCCESS',
    data: products,
  };
}

export default {
  register,
  findAll,
};