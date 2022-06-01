import { NextFunction, Request, Response, Router } from 'express';
import { header } from 'express-validator';
import Web3 from 'web3';
import logger from '../utilities/logger.util';
import { CustomError } from './models/custom-error.model';
import validateAndThrow from './validation.handler';

const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');

const router = Router();

/**
 * Determines if the user is authenticated
 *
 * And if the signature as well as the wallet address are valid and present
 *
 */
const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { signature, address } = req.headers;

  const isValid = await validateSignature(signature as string, address as string);

  if (!isValid) {
    next(new CustomError('Invalid signature or address. Unauthorized', 401));
    return;
  }

  res.locals.address = address;

  next();
};

const validateSignature = (signature: string, address: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await web3.eth.accounts.recover('auth', signature);
      logger.log('info', signature);
      logger.log('info', result);
      const checkSumAddress = web3.utils.toChecksumAddress(address);
      if (result === checkSumAddress) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      resolve(false);
    }
  });
};

const validators = validateAndThrow([
  header('signature')
    .exists()
    .withMessage('Signature is missing')
    .isString()
    .withMessage('Signature must be a string')
    .isLength({ min: 132, max: 132 })
    .withMessage('Signature must be 132 characters long'),

  header('address')
    .exists()
    .withMessage('Address is missing')
    .bail()
    .isString()
    .withMessage('Address must be a string')
    .bail()
    .isByteLength({ min: 42, max: 42 })
    .withMessage('Address is not valid'),
]);

router.use(validators, auth);

export default router;
