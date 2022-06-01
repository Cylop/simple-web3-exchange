import { getStore, addStore } from '../store.service';

describe('Store service', () => {
  describe('getStore', () => {
    it('should get the store for the given address', async () => {
      const address = '0x0';
      const store = await getStore(address);
      expect(store.address).toBe(address);
    });
  });

  describe('addStore', () => {
    it('should add the store for the given address', async () => {
      const address = '0x0';
      const store = await addStore(address);
      expect(store.address).toBe(address);
    });
  });
});
