import { NextFunction, Request, Response } from 'express';

import { ValidationChain, validationResult } from 'express-validator';
import { CustomError } from './models/custom-error.model';

/**
 * Validates parameters via express-validator
 * throws error if validationResult is not empty
 */
const validateAndThrow = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError('Invalid parameters', 422, {
        path: req.path,
        errors: errors.array(),
      });
      next(error);
      return;
    }
    next();
  };
};

export default validateAndThrow;
