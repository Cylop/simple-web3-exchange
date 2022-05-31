import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Web3Provider from './contexts/Web3Context/Web3Context';

const container = document.getElementById('app');

if (!container) {
  throw new Error('No container found');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Web3Provider>
      <App />
    </Web3Provider>
  </BrowserRouter>,
);
