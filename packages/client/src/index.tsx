import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Web3Provider from './contexts/Web3Context/Web3Context';

ReactDOM.render(
  <BrowserRouter>
    <Web3Provider>
      <App />
    </Web3Provider>
  </BrowserRouter>,
  document.getElementById('app') as HTMLElement,
);
