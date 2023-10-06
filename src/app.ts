import express from 'express';

import productsRouter from './routes/products.router';
import loginRouter from './routes/login.router';
import orderRouter from './routes/orders.router';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(productsRouter);
app.use(orderRouter);

export default app;
