import { Token, Balance } from '../types';
import { getStore } from './store.service';

/* Get balance for a given token for a given address */
export const getBalance = async (address: string, token: Token): Promise<Balance> => {
  const store = await getStore(address);
  const balance = store.balances.find(b => b.token === token);
  if (!balance) {
    throw new Error('Balance not found');
  }
  return balance;
};

/* Get all balances for a given address */
export const getBalances = async (address: string): Promise<Balance[]> => {
  const store = await getStore(address);
  return store.balances;
};
