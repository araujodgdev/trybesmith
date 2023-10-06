import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import productsMocks from '../../mocks/products.mocks';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retorna todos os produtos com sucesso', async function () {
    const mockFindAllReturn = productsMocks.allProducts.map((product) => ProductModel.build(product));
    sinon.stub(ProductModel, 'findAll').resolves(mockFindAllReturn)

    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(productsMocks.allProducts)
  })
});
