import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'M@gic';

type Payload = {
  id: number;
  username: string;
};

function login(payload: Payload): string {
  return jwt.sign(payload, secret, { expiresIn: '10h' });
}

function verify(token: string): Payload {
  return jwt.verify(token, secret) as Payload;
}

export default {
  login,
  verify,
};