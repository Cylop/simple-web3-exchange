import { placeOrder, getOrders, cancelOrder } from '../order.service';
import { clearStores } from '../store.service';

describe('Order service', () => {
  beforeAll(() => {
    clearStores();
  });

  describe('placeOrder', () => {
    it('should place an order', async () => {
      const address = '0x0';
      const side = 'BUY';
      const amount = 5700;
      const token = 'ETH';
      const price = 5700;
      const orderId = await placeOrder(address, side, amount, token, price);
      expect(orderId).toBeTruthy();
    });
  });

  describe('getOrders', () => {
    it('should get all orders for a given address', async () => {
      const address = '0x0';
      const orders = await getOrders(address);
      expect(orders.length).toBe(0);

      const orderId = await placeOrder(address, 'BUY', 5700, 'ETH', 5700);
      const orders2 = await getOrders(address);
      expect(orders2.length).toBe(1);
      expect(orders2[0].id).toBe(orderId);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order', async () => {
      const address = '0x0';
      const side = 'BUY';
      const amount = 5700;
      const token = 'ETH';
      const price = 5700;

      const orderId = await placeOrder(address, side, amount, token, price);
      const orders = await getOrders(address);
      expect(orders.length).toBe(1);
      expect(orders[0].id).toBe(orderId);

      await cancelOrder(address, orderId);
      const orders2 = await getOrders(address);
      expect(orders2.length).toBe(0);
    });
  });
});
