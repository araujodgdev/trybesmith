import bcrypt from 'bcryptjs';

const validPassword = 'terrível'
const validUsername = 'Hagar';

const invalidPassword = 'terrve1';
const invalidUsername = 'hag4r';

const validLogin = {
  username: validUsername,
  password: validPassword,
};

const invalidLogin = {
  username: invalidUsername,
  password: invalidPassword,
}

const validUsernameWithWrongPassword = {
  username: validUsername,
  password: invalidPassword
}

const existingUser = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: bcrypt.hashSync('terrível', 10),
}

export default {
  validLogin,
  invalidLogin,
  existingUser,
  validUsernameWithWrongPassword
}
