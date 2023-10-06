import { Request, Response } from 'express';

import productsServices from '../Services/products.services';
import mapHttpStatus from '../util/mapHTTPStatus';

async function registerNewProduct(req: Request, res: Response) {
  const registerResponse = await productsServices.register(req.body);
  const { status, data } = registerResponse;

  res.status(mapHttpStatus(status)).json(data);
}

async function getAllProducts(req: Request, res: Response) {
  const serviceResponse = await productsServices.findAll();
  const { status, data } = serviceResponse;

  res.status(mapHttpStatus(status)).json(data);
}

export default {
  registerNewProduct,
  getAllProducts,
};