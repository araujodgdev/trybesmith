import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../util/jwt.util';
import UserModel from '../database/models/user.model';

export function extractToken(token: string): string {
  return token.split(' ')[1];
}

async function handleAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);
  const decoded = jwtUtil.verify(token);
  if (!decoded) { return res.status(401).json({ message: 'Invalid token' }); }
  const user = await UserModel.findOne({
    where: {
      username: decoded.username,
    },
  });
  req.headers.authorization = token;
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}

export default handleAuth;