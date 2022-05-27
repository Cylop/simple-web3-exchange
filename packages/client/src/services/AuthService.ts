const isEthereumAvailable = () => !!window.ethereum;

const isConnected = (): boolean =>
  window?.ethereum?.isConnected() ?? false;

const getAccounts = (): Promise<string[]> => {
  if (!isConnected()) {
    return Promise.reject(
      new Error('MetaMask is not connected'),
    );
  }

  return window.ethereum.request({
    method: 'eth_requestAccounts',
  });
};

// 'auth' can be used as data
const personalSign = (
  data: string,
  address: string,
): Promise<string> => {
  if (!isConnected()) {
    return Promise.reject(
      new Error('MetaMask is not connected'),
    );
  }

  return window.ethereum.request({
    method: 'personal_sign',
    params: [data, address],
  });
};

const AuthService = {
  isEthereumAvailable,
  isConnected,
  getAccounts,
  personalSign,
};

export default AuthService;
