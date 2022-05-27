import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import KeyMirror from 'keymirror';

import Web3 from 'web3';
import AuthService from '../../services/AuthService';

const Action = KeyMirror({
  SET_ACCOUNT: null,
  DISCONNECT: null,
});

type ActionType = 'SET_ACCOUNT' | 'DISCONNECT';

type Web3ContextStateType = {
  account?: string;
};

type Web3InternalContextStateType = {
  web3?: Web3;
};

type Web3ContextFunctionsType = {
  loadAccount: () => void;
  disconnect: () => void;
  isLoggedIn: () => boolean;
  getSignature: () => Promise<string>;
};

type Web3ContextType = Web3ContextStateType &
  Web3InternalContextStateType &
  Web3ContextFunctionsType;

const initialFunctions = {
  loadAccount: () => {},
  disconnect: () => {},
  isLoggedIn: () => false,
  getSignature: () =>
    Promise.reject(new Error('Not connected')),
};

const initialState: Web3ContextStateType = {
  account: undefined,
};

const Web3Context = createContext<Web3ContextType>({
  ...initialFunctions,
});

const contextReducer = (
  state: Web3ContextStateType,
  action: {
    type: ActionType;
    payload?: string;
  },
) => {
  switch (action.type) {
    case Action.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case Action.DISCONNECT:
      return {
        ...state,
        account: undefined,
      };
    default:
      return state;
  }
};

const Web3Provider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    contextReducer,
    initialState,
  );

  const setAccount = useCallback(
    (account: string) => {
      dispatch({
        type: Action.SET_ACCOUNT,
        payload: account,
      });
    },
    [],
  );

  const loadAccount = useCallback(async () => {
    const accounts =
      await AuthService.getAccounts();
    setAccount(accounts[0]);
  }, []);

  const disconnect = useCallback(() => {
    dispatch({
      type: Action.DISCONNECT,
    });
  }, []);

  const isLoggedIn = useCallback(
    (): boolean => !!state?.account ?? false,
    [state.account],
  );

  const getSignature =
    useCallback(async (): Promise<string> => {
      if (!state?.account)
        return Promise.reject(
          new Error('Not connected'),
        );

      return AuthService.personalSign(
        'auth',
        state?.account,
      );
    }, [state.account]);

  const value: Web3ContextType = {
    ...state,
    loadAccount,
    disconnect,
    isLoggedIn,
    getSignature,
  };
  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error(
      'useWeb3Context must be used within a Web3Provider',
    );
  }
  return context;
};

export default Web3Provider;

export { useWeb3Context };
