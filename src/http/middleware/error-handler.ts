import { ErrorRequestHandler } from 'express';
import CustomError from '../../errors/custom';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);

  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError('Something went wrong');
  }

  res.status((customError as CustomError).status).send(customError);
};

export default errorHandler;
