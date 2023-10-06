import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMocks from '../../mocks/login.mocks';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retorna um token quando receber um username e password válidos', async function () {
    const httpRequestBody = loginMocks.validLogin;
    const mockFindOneReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const response = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);

    expect(response).to.have.status(200);
    expect(response.body).to.have.key('token');
  });

  it('Retorna um erro ao tentar logar sem username ou password', async function () {
    const httpRequestBody = { username: '', password: '' };
    
    const response = await chai.request(app).post('/login').send(httpRequestBody);

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('message', '"username" and "password" are required')
  })

  it('Retorna um erro ao tenta logar com um username não cadastrado', async function () {
    const httpRequestBody = loginMocks.invalidLogin;
    UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    const response = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message', 'Username or password invalid');
  })

  it('Retorna um erro ao tentar logar com uma senha incorreta', async function () {
    const httpRequestBody = loginMocks.validUsernameWithWrongPassword;
    const mockFindOneReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const response = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);

      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message', 'Username or password invalid');
  })
});

// iniciando  o projeto!
