import { Router } from 'express';
import productsController from '../controllers/products.controller';

const productsRouter = Router();

productsRouter.post('/products', productsController.registerNewProduct);
productsRouter.get('/products', productsController.getAllProducts);

export default productsRouter;