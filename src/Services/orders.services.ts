import OrderModel, 
{ OrderInputtableTypes, OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Order } from '../types/Order';

async function getAll(): Promise<ServiceResponse<Order[]>> {
  const orders = await OrderModel.findAll(
    { include: { model: ProductModel, as: 'productIds', attributes: ['id'] } },
  );
  const ordersDataValues = orders.map((order: OrderSequelizeModel) => order.dataValues);
  const output = ordersDataValues.map((ord: any) => {
    const { id, userId } = ord;
    const out = {
      id,
      userId,
      productIds: ord.productIds.flatMap((prodId: any) => prodId.id),
    };

    return out;
  });

  return {
    status: 'SUCCESS',
    data: output,
  };
}

async function register(
  userId: number,
  productIds: number[],
): Promise<ServiceResponse<OrderInputtableTypes>> {
  const order = await OrderModel.create({ userId });
  productIds.forEach(async (prodId: number) => {
    await ProductModel.update({ orderId: order.dataValues.id }, { where: { id: prodId } });
  });
  const output = { userId: order.dataValues.userId, productIds } as OrderInputtableTypes;

  return { status: 'CREATED', data: output };
}

export default {
  getAll,
  register,
};