import { Request, Response } from 'express';
import ordersServices from '../Services/orders.services';

async function getAllOrders(req: Request, res: Response) {
  const response = await ordersServices.getAll();

  res.status(200).json(response.data);
}

async function registerNewOrder(req: Request, res: Response) {
  const { userId, productIds } = req.body;
  const response = await ordersServices.register(userId, productIds);

  res.status(201).json(response.data);
}

export default {
  getAllOrders,
  registerNewOrder,
};