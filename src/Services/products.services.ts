import ProductModel, {
  ProductInputtableTypes, ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';

import { ServiceResponse } from '../types/ServiceResponse';
import productValidations from './validations/product.validations';

async function register(info: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  try {
    const { name, price, orderId } = info;
    const product = await ProductModel.create({ name, price, orderId });
    const responseInfo = {
      id: product.dataValues.id,
      name: product.dataValues.name,
      price: product.dataValues.price,
    } as Product;

    if (!productValidations.hasInfoToRegister(info)) {
      throw new Error('Invalid data!');
    }
    return { status: 'CREATED', data: responseInfo };
  } catch (error) {
    return { status: 'INVALID_DATA',
      data: { message: 'Invalid data!' },
    };
  }
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