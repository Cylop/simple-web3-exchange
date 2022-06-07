import AuthService from './auth.service';

export const token = ['ETH', 'USDT', 'DVF'] as const;
export type Token = typeof token[number];

export const orderside = ['BUY', 'SELL'] as const;
export type OrderSide = typeof orderside[number];

export const API_URL = 'http://localhost:5000';

export const SIGNATURE_HEADER = 'x-signature';
export const ADDRESS_HEADER = 'x-address';

export const preparedFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  if (!AuthService.isAuthenticated()) return Promise.reject(new Error('Not authenticated'));

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append(SIGNATURE_HEADER, AuthService.getSignature());
  headers.append(ADDRESS_HEADER, AuthService.getAddress());

  const defaults = { headers };
  const tmpOptions = { ...defaults, ...options };
  const response = await fetch(API_URL + url, tmpOptions);
  return response.json();
};
