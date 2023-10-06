import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import loginMocks from '../../mocks/login.mocks';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

const orderRequestBody = { productIds: [1, 2], userId: 1}

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('É possível criar um pedido com sucesso', async function () {
    const httpRequestBody = loginMocks.validLogin;
    const mockFindOneResult = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneResult);
    const response = await chai.request(app).post('/login').send(httpRequestBody);
    const authorization = `Baerer ${response.body.token}`;

    const orderResponse = await chai.request(app).post('/orders').set('authorization', authorization).send(orderRequestBody);

    expect(orderResponse.status).to.be.equal(201);
  })
});
