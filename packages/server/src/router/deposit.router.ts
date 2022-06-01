import { Router } from 'express';
import validateAndThrow from '../middlewares/validation.handler';
import { deposit } from '../services/deposit.service';
import { AMOUNT_VALIDATOR, TOKEN_VALIDATOR } from './validator';

const router = Router();

/**
 * Deposit token balance to the store for a given address and returns the status
 */
router.post('/deposit', validateAndThrow([TOKEN_VALIDATOR, AMOUNT_VALIDATOR]), async (req, res) => {
  const { address } = res.locals;
  const { token, amount } = req.body;
  const balance = await deposit(address, token, amount);
  res.status(200).send(balance);
});

export default router;
