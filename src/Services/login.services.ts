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
  const user = await UserModel.findOne({ where: { username: loginInfo.username } });

  if (!user) {
    return { status: 'INVALID_DATA', data: { message: 'Invalid username' } };
  }

  if (!bcrypt.compareSync(loginInfo.password, user.dataValues.password)) {
    return { status: 'INVALID_DATA', data: { message: 'Wrong password' } };
  }

  const payload = { id: user.dataValues.id, username: user.dataValues.username };
  const token = jwtUtil.login(payload);

  return { status: 'SUCCESS', data: { token } };
}

export default {
  verifyLogin,
};