import { nanoid } from 'nanoid/async';
import { CustomError } from '../middlewares/models/custom-error.model';
import { Order, OrderSide, Token } from '../types';
import { getStore } from './store.service';

/**
 * Places an order
 *
 * @returns {Promise<string>} created orderID
 */
export const placeOrder = async (
  address: string,
  side: OrderSide,
  amount: number,
  token: Token,
  price: number,
): Promise<string> => {
  const store = await getStore(address);
  const orderId = await nanoid();
  const order = { id: orderId, side, amount, token, price };
  store.orders.push(order);
  return orderId;
};

/**
 * Get all orders for a given address
 */
export const getOrders = async (address: string): Promise<Order[]> => {
  const store = await getStore(address);
  return store.orders;
};

/**
 * Cancel an order for a given address and orderID
 */
export const cancelOrder = async (address: string, orderId: string): Promise<void> => {
  const store = await getStore(address);
  const orderIndex = store.orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    throw new CustomError('Order not found');
  }
  store.orders.splice(orderIndex, 1);
};
