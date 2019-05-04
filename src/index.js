import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import ContextProvider from './global-context';

const Root = () => (
  <ContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ContextProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
