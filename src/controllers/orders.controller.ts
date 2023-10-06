import { Request, Response } from 'express';
import ordersServices from '../Services/orders.services';

async function getAllOrders(req: Request, res: Response) {
  const response = await ordersServices.getAll();

  res.status(200).json(response.data);
}

export default {
  getAllOrders,
};