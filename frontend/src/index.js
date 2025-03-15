import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import Axios from 'axios';

// Establecer la URL base
Axios.defaults.baseURL = 'http://localhost:4000'; // Backend

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
