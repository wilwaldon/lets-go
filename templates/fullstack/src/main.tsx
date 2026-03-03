import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Validate environment variables before app starts
// This will throw an error if required vars are missing
import './lib/env';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
