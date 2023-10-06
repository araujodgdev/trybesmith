import { Request, Response, NextFunction } from 'express';
import mapHttpStatus from '../util/mapHTTPStatus';

import { ServiceResponse } from '../types/ServiceResponse';

function nameValidation(name: string): ServiceResponse<string> | undefined {
  if (!name) {
    return { status: 'INVALID_DATA', data: { message: '"name" is required' } };
  }

  if (typeof name !== 'string') {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" must be a string' },
    };
  }
  const minNameLength = name.length > 2;

  if (!minNameLength) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }
}

function priceValidation(price: string): ServiceResponse<string> | undefined {
  if (!price) {
    return { status: 'INVALID_DATA', data: { message: '"price" is required' } };
  }

  if (typeof price !== 'string') {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"price" must be a string' },
    };
  }
  const minNameLength = price.length > 2;

  if (!minNameLength) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }
}

async function validateProductInfo(req: Request, res: Response, next: NextFunction) {
  const { name, price } = req.body;
  const validName = nameValidation(name);
  const validPrice = priceValidation(price);
  if (validName !== undefined) {
    return res.status(mapHttpStatus(validName.status)).json(validName.data);
  }
  if (validPrice !== undefined) {
    return res.status(mapHttpStatus(validPrice.status)).json(validPrice.data);
  }
  next();
}

export default validateProductInfo;