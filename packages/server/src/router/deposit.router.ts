import { Router } from 'express';

const router = Router();

router.get('/ping', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'All systems are up and running',
  });
});

export default router;
