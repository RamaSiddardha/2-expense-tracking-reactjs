import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "../node_modules/react-bootstrap/dist/react-bootstrap.min.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import { LoginContextProvider } from './Context/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
    <App />
    </LoginContextProvider>
  </React.StrictMode>
);


