import { Router } from 'express';
import productsController from '../controllers/products.controller';
import validateProductInfo from '../middlewares/productValidation.middleware';

const productsRouter = Router();

productsRouter.post('/products', validateProductInfo, productsController.registerNewProduct);
productsRouter.get('/products', productsController.getAllProducts);

export default productsRouter;