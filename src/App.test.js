import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './global-context';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const WrappedApp = (
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  )
  ReactDOM.render(WrappedApp, div);
  ReactDOM.unmountComponentAtNode(div);
});
