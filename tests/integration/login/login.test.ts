import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMocks from '../../mocks/login.mocks';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it ('Retorna um token quando receber um username e password válidos', async function () {
    const httpRequestBody = loginMocks.validLogin;
    const mockFindOneReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const response = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);

    expect(response).to.have.status(200);
    expect(response.body).to.have.key('token');
  });
});

// iniciando  o projeto!
