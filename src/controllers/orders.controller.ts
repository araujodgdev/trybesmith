import { Request, Response } from 'express';
import ordersServices from '../Services/orders.services';
import mapHttpStatus from '../util/mapHTTPStatus';

async function getAllOrders(req: Request, res: Response) {
  const response = await ordersServices.getAll();

  if (response.status !== 'SUCCESS') {
    return res.status(mapHttpStatus(response.status)).json(response.data);
  }

  res.status(200).json(response.data);
}

export default {
  getAllOrders,
};