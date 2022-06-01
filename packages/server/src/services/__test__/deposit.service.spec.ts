import { deposit } from '../deposit.service';

describe('Deposit service', () => {
  describe('deposit', () => {
    it('should deposit token with balance to the store for the given address', async () => {
      const address = '0x0';
      const token = 'ETH';
      const amount = 5700;
      const balance = await deposit(address, token, amount);
      expect(balance.token).toBe(token);
    });
  });
});
