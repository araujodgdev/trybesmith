import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../util/jwt.util';
import UserModel from '../database/models/user.model';

function extractToken(token: string): string {
  return token.split(' ')[1];
}

async function handleAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);
  const { username } = jwtUtil.verify(token);
  const user = UserModel.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}

export default handleAuth;