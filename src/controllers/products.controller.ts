import { Request, Response } from 'express';

import productsServices from '../Services/products.services';
import mapHttpStatus from '../util/mapHTTPStatus';

async function registerNewProduct(req: Request, res: Response) {
  try {
    const registerResponse = await productsServices.register(req.body);
    const { status, data } = registerResponse;

    res.status(mapHttpStatus(status)).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal error!' });
  }
}

export default {
  registerNewProduct,
};