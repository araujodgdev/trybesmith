import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'M@gic';

type Payload = {
  id: number;
  username: string;
};

function login(payload: Payload): string {
  return jwt.sign(payload, secret, { expiresIn: '10h' });
}

export default {
  login,
};