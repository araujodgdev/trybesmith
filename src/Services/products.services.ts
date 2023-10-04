import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

import { ServiceResponse } from '../types/ServiceResponse';

async function register({
  name,
  price,
  orderId,
}: ProductInputtableTypes): Promise<ServiceResponse<ProductSequelizeModel>> {
  try {
    const product = await ProductModel.create({
      name,
      price,
      orderId,
    });

    return { status: 'SUCCESS', data: product };
  } catch (error) {
    return { status: 'INVALID_DATA',
      data: {
        message: 'Invalid data!',
      },
    };
  }
}

export default {
  register,
};