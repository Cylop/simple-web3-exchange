import { getBalance, getBalances } from '../balance.service';

describe('Balance service', () => {
  describe('getBalance', () => {
    it('should get the balance for the given token for the given address', async () => {
      const address = '0x0';
      const token = 'ETH';
      const balance = await getBalance(address, token);
      expect(balance.token).toBe(token);
    });
  });

  describe('getBalances', () => {
    it('should get all balances for the given address', async () => {
      const address = '0x0';
      const balances = await getBalances(address);
      expect(balances.length).toBe(0);
    });
  });
});
