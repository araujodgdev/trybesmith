import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it ('Ao tentar cadastrar um produto sem nome, retorna um erro', async function () {
    const response = await chai.request(app)
      .post('/products')
      .send({ price: '100 peças de ouro', orderId: 1 });
    expect(response).to.have.status(400);
    expect(response.body).to.be.eql({ message: 'Invalid data!' });
  });

  it ('É possível cadastrar um produto corretamente', async function () {
    const response = await chai.request(app)
      .post('/products')
      .send({ name: 'Pomo de ouro', price: '100 peças de ouro', orderId: 1 });
    expect(response.status).to.equal(201);
  })
});
