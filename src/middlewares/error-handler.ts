import { NextFunction, Request, Response } from 'express';
import { APIError } from '../errors/APIError';

export function errorHandler(err: APIError | Error | any, req: Request, res: Response, next: NextFunction) {

  if(err instanceof APIError) {
    return res.status(err.statusCode).json({ errorFeedback: err.message });
  }

  console.error('##### ERROR HANDLER #####');
  console.error(err);
  console.error('#########################');

  return res.status(500).json({ errorFeedback: 'Houve um problema interno nos nossos servidores, tente novamente.' });
}
