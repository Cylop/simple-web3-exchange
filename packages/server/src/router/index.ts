import { Router } from 'express';
import depositRouter from './deposit.router';

const router = Router();

router.use(depositRouter);

export default router;
