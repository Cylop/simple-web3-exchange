import { body } from 'express-validator';
import { orderside, token } from '../../types';

export const TOKEN_VALIDATOR = body('token')
  .isString()
  .notEmpty()
  .withMessage('Token is required')
  .bail()
  .isIn(token)
  .withMessage('Token must be one of: ' + token.join(', '));

export const AMOUNT_VALIDATOR = body('amount')
  .isNumeric()
  .withMessage('Amount must be a number')
  .bail()
  .isFloat({ min: 0 })
  .withMessage('Amount must be a positive number')
  .bail()
  .isFloat({ max: Number.MAX_SAFE_INTEGER })
  .withMessage('Amount must be less than 2^53 - 1');

export const PRICE_VALIDATOR = body('price')
  .isNumeric()
  .withMessage('Price must be a number')
  .bail()
  .isFloat({ min: 0 })
  .withMessage('Price must be a positive number')
  .bail()
  .isFloat({ max: Number.MAX_SAFE_INTEGER })
  .withMessage('Price must be less than 2^53 - 1');

export const SIDE_VALIDATOR = body('side')
  .toUpperCase()
  .isString()
  .notEmpty()
  .withMessage('Side is required')
  .bail()
  .isIn(orderside)
  .withMessage('Side must be one of: ' + orderside.join(', '));

export const ORDER_ID_VALIDATOR = body('orderId')
  .isString()
  .notEmpty()
  .withMessage('OrderId is required')
  .bail()
  .isLength({ min: 1, max: 21 })
  .withMessage('OrderId must be between 1 and 21 characters');
