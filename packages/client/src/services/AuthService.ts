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

const AuthService = {
  isEthereumAvailable,
  isConnected,
  getAccounts,
  personalSign,
  ecRecover,
};

export default AuthService;
