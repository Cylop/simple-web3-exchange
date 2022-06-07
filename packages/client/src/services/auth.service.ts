import { Maybe } from '@metamask/providers/dist/utils';

const isEthereumAvailable = () => !!window.ethereum;

const isConnected = (): boolean => window?.ethereum?.isConnected() ?? false;

const getAccounts = (): Promise<Maybe<string[]>> => {
  if (!window?.ethereum) {
    return Promise.reject(new Error('MetaMask is not connected'));
  }

  return window.ethereum.request({
    method: 'eth_requestAccounts',
  });
};

// 'auth' can be used as data
const personalSign = (data: string, address: string): Promise<Maybe<string>> => {
  if (!window?.ethereum) {
    return Promise.reject(new Error('MetaMask is not connected'));
  }

  return window.ethereum.request({
    method: 'personal_sign',
    params: [data, address],
  });
};

const ecRecover = (data: string, signature: string): Promise<Maybe<string>> => {
  if (!window?.ethereum) {
    return Promise.reject(new Error('MetaMask is not connected'));
  }
  return window.ethereum.request({
    method: 'eth_ecRecover',
    params: [data, signature],
  });
};

const login = async (): Promise<void> => {
  if (!window?.ethereum) {
    return Promise.reject(new Error('MetaMask is not connected'));
  }

  try {
    const accounts = await getAccounts();
    const account = accounts?.[0];

    if (!account) {
      throw new Error('No accounts');
    }
    const signature = await personalSign('auth', account);

    if (!signature) {
      throw new Error('No signature');
    }
    localStorage.setItem('signature', signature);
    localStorage.setItem('address', account);
  } catch (error) {
    return Promise.reject(new Error('Authentication failed'));
  }
  return Promise.resolve();
};

/**
 * Get the current signature
 */
export const getSignature = () => {
  const signature = localStorage.getItem('signature');
  return signature ?? '';
};

/**
 * Get the wallet address from the local storage
 */
export const getAddress = () => {
  const address = localStorage.getItem('address');
  return address ?? '';
};

/**
 * Checks if the user is already authenticated
 */
export const isAuthenticated = () => {
  const address = getAddress();
  const signature = getSignature();
  return !!address && !!signature;
};

const AuthService = {
  isEthereumAvailable,
  isConnected,
  getAccounts,
  personalSign,
  ecRecover,

  getSignature,
  getAddress,
  isAuthenticated,

  login,
};

export default AuthService;
