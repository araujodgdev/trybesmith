import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app'
import ordersMocks from '../../mocks/orders.mocks';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });


  it('Retorna todos os produtos com sucesso', async function () {
    const mockFindAllReturn = ordersMocks.allOrdersFromDB.map((order) => OrderModel.build(order,  { include: { model: ProductModel, as: 'productIds', attributes: ['id'] } }));
    sinon.stub(OrderModel, 'findAll').resolves(mockFindAllReturn);

    const response = await chai.request(app).get('/orders');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(ordersMocks.allOrders)
  })
});
