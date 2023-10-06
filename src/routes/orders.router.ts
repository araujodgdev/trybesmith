import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import orderValidationMiddleware from '../middlewares/orderValidation.middleware';
import handleAuth from '../middlewares/auth.middleware';

const orderRouter = Router();

orderRouter.get('/orders', ordersController.getAllOrders);
orderRouter.post(
  '/orders',
  handleAuth,
  orderValidationMiddleware.validateUser,
  orderValidationMiddleware.validateProduct,
  ordersController.registerNewOrder,
);

export default orderRouter;
