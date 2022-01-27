import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/layout/App';
import { StoreContext, store } from './app/stores/store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
