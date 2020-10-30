import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom'
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import store from '@/store';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);

