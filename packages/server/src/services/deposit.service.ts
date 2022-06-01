import { Balance, Token } from '../types';
import { getStore } from './store.service';

/* Deposit token with balance to the store for a given address */
export const deposit = async (address: string, token: Token, amount: number): Promise<Balance> => {
  const store = await getStore(address);
  let balance = store.balances.find(b => b.token === token);
  if (!balance) {
    balance = { token, amount };
    store.balances.push(balance);
  } else {
    balance.amount += amount;
  }
  return balance;
};
