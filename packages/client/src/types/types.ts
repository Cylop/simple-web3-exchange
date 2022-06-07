export type Store = {
  address: string;
  orders: Order[];
  balances: Balance[];
};

export type Order = {
  id: string;
  token: Token;
  amount: number;
  price: number;
  side: OrderSide;
};

export type Balance = {
  token: Token;
  amount: number;
};

export const token = ['ETH', 'USDT', 'DVF'] as const;
export type Token = typeof token[number];

export const orderside = ['BUY', 'SELL'] as const;
export type OrderSide = typeof orderside[number];
