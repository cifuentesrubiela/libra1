import React from 'react';
import ReactDOM from 'react-dom/client';  // Cambiar la importación
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Usar createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
