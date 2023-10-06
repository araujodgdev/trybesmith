import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtil from '../util/jwt.util';

type Token = {
  token: string
};

type Login = {
  username: string;
  password: string
};

async function verifyLogin(loginInfo: Login): Promise<ServiceResponse<Token>> {
  if (!loginInfo.username || !loginInfo.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  const user = await UserModel.findOne({ where: { username: loginInfo.username } });

  if (!user || !bcrypt.compareSync(loginInfo.password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const payload = { id: user.dataValues.id, username: user.dataValues.username };
  const token = jwtUtil.login(payload);

  return { status: 'SUCCESS', data: { token } };
}

export default {
  verifyLogin,
};