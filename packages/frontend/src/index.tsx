import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GlobalAppProvider from './context/GlobalAppProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalAppProvider>
      <App />
    </GlobalAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
