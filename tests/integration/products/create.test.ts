import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import loginMocks from '../../mocks/login.mocks';

chai.use(chaiHttp);

async function realizeLogin() {
  const httpRequestBody = loginMocks.validLogin;
  const loginResponse = await chai.request(app).post('/login').send(httpRequestBody);

  return loginResponse.body;
}

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Ao tentar cadastrar um produto sem nome, retorna um erro', async function () {
    const { token } = await realizeLogin();
    const authHeader = `Baerer ${token}`;
    const response = await chai.request(app)
      .post('/products')
      .send({ price: '100 peças de ouro', orderId: 1 });
    expect(response).to.have.status(400);
    expect(response.body).to.be.eql({ message: '"name" is required' });
  });

  it('É possível cadastrar um produto corretamente', async function () {
    const { token } = await realizeLogin();
    const authHeader = `Baerer ${token}`;
    const response = await chai.request(app)
      .post('/products')
      .send({ name: 'Pomo de ouro', price: '100 peças de ouro', orderId: 1 });
    expect(response.status).to.equal(201);
  })
});