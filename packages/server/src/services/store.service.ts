import { Store } from '../types';

let stores: { address: string; store: Store }[] = [];

/*
 * Gets the store for the given address
 *
 * @param {string} address
 * @returns {Store}
 */
export const getStore = async (address: string): Promise<Store> => {
  return new Promise(async (resolve, reject) => {
    const store = stores.find(s => s.address === address);
    if (store) {
      resolve(store.store);
    } else {
      const createdStore = await addStore(address);
      resolve(createdStore);
    }
  });
};

/*
 * Add store to the list of stores
 *
 * @param {string} address
 */
export const addStore = (address: string): Promise<Store> => {
  return new Promise((resolve, reject) => {
    const store = stores.find(s => s.address === address);
    if (store) {
      resolve(store.store);
    } else {
      const newStore = { address, store: { address, orders: [], balances: [] } };
      stores.push(newStore);
      resolve(newStore.store);
    }
  });
};

export const clearStores = () => {
  stores = [];
};
