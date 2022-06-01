import { NextFunction, Response, Router, Request } from 'express';
import validateAndThrow from '../middlewares/validation.handler';
import { cancelOrder, getOrders, placeOrder } from '../services/order.service';
import {
  AMOUNT_VALIDATOR,
  ORDER_ID_VALIDATOR,
  PRICE_VALIDATOR,
  SIDE_VALIDATOR,
  TOKEN_VALIDATOR,
} from './validator';

const router = Router();

/**
 * Place an order for a given address and returns the orderId
 */
router.post(
  '/placeOrder',
  validateAndThrow([SIDE_VALIDATOR, AMOUNT_VALIDATOR, TOKEN_VALIDATOR, PRICE_VALIDATOR]),
  async (req: Request, res: Response) => {
    const { address } = res.locals;
    const { side, amount, token, price } = req.body;
    const orderId = await placeOrder(address, side, amount, token, price);
    res.status(200).send({ orderId });
  },
);

/**
 * Cancel an order for a given address and orderID
 */
router.post(
  '/cancelOrder',
  validateAndThrow([ORDER_ID_VALIDATOR]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { address } = res.locals;
    const { orderId } = req.body;
    try {
      await cancelOrder(address, orderId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Get all orders for a given address
 */
router.get('/getOrders', async (req: Request, res: Response) => {
  const { address } = res.locals;
  const orders = await getOrders(address as string);
  res.status(200).send(orders);
});

export default router;
