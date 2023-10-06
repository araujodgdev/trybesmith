import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'M@gic';

type Payload = {
  id: number;
  username: string;
};

function login(payload: Payload): string {
  return jwt.sign(payload, secret, { expiresIn: '10h' });
}

function verify(token: string): Payload | null {
  try {
    const decoded = jwt.verify(token, secret) as Payload; 
    return decoded;
  } catch (error) {
    return null;
  }
}

export default {
  login,
  verify,
};