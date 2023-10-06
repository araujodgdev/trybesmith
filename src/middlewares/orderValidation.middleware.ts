import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../util/jwt.util';
import UserModel from '../database/models/user.model';

async function validateUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.body;
  const token = req.headers.authorization as string;
  const decoded = jwtUtil.verify(token);
  const user = await UserModel.findOne({ where: { username: decoded?.username } });
  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  if (!Number.isInteger(userId)) {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  if (userId !== user?.dataValues.id) {
    return res.status(404).json({ message: '"userId" not found' });
  }

  next();
}

async function validateProduct(req: Request, res: Response, next: NextFunction) {
  const products: number[] = req.body.productIds;
  if (!products) {
    return res.status(400).json({ message: '"productIds" is required' });
  }
  if (!Array.isArray(products)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }
  if (products.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }

  next();
}

export default {
  validateProduct,
  validateUser,
};