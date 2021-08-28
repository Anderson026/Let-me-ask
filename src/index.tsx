import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// importando o firebase
import "./services/firebase";
// importando o css global
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


