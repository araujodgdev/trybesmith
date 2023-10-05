import express from 'express';

import productsRouter from './routes/products.router';
import handleAuth from './middlewares/auth.middleware';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(handleAuth);
app.use(productsRouter);

export default app;
