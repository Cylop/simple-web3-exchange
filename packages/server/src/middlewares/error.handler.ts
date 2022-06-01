import { NextFunction, Request, Response } from 'express';
import { CustomError } from './models/custom-error.model';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 */
const errorHandler = (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let customError = err;

  const message = err.message;

  if (!(err instanceof CustomError)) {
    customError = new CustomError("Seems like there's an issue", 500, message);
  }

  res.status((customError as CustomError).status).send(customError);
};

export default errorHandler;
