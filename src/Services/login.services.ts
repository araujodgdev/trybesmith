import bcrypt from 'bcryptjs';
import UserModel, { UserInputtableTypes } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtil from '../util/jwt.util';

type Token = {
  token: string
};

async function verifyLogin(loginInfo: UserInputtableTypes): Promise<ServiceResponse<Token>> {
  const { username, password } = loginInfo;
  const user = await UserModel.findOne({ where: { username } });

  if (!user) {
    return {
      status: 'INVALID_DATA',
      data: { message: 'Invalid username' },
    };
  }

  if (!bcrypt.compare(password, user.dataValues.password)) {
    return { status: 'INVALID_DATA', data: { message: 'Wrong password' } };
  }

  const payload = { id: user.dataValues.id, username: user.dataValues.username };
  const token = jwtUtil.login(payload);

  return { status: 'SUCCESS', data: { token } };
}

export default {
  verifyLogin,
};