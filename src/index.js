import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Home from './components/pages/Home';
import {BrowserRouter} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider autoDismiss autoDismissTimeout={6000}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </ToastProvider>
  </Provider>,
  document.getElementById('root'),
);
