import { Router } from 'express';
import { getBalances } from '../services/balance.service';

const router = Router();

/**
 * Get balances for a given address and returns the balances
 */
router.get('/getBalances', async (req, res) => {
  const { address } = res.locals;
  const balances = await getBalances(address as string);
  res.status(200).send(balances);
});

export default router;
