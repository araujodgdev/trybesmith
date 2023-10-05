import { Request, Response } from 'express';
import loginServices from '../Services/login.services';
import mapHttpStatus from '../util/mapHTTPStatus';

async function realizeLogin(req: Request, res: Response) {
  const response = await loginServices.verifyLogin(req.body);

  if (response.status !== 'SUCCESS') {
    return res.status(mapHttpStatus(response.status)).json(response.data);
  }

  res.status(200).json(response.data);
}

export default {
  realizeLogin,
};