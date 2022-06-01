import { Router } from 'express';
import depositRouter from './deposit.router';
import balanceRouter from './balance.router';
import orderRouter from './order.router';

const router = Router();

router.use(depositRouter);
router.use(balanceRouter);
router.use(orderRouter);

export default router;
