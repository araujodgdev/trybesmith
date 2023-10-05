import { Router } from 'express';
import loginController from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/login', loginController.realizeLogin);

export default loginRouter;