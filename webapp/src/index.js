import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route ,BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import store from '@/store';
// import reportWebVitals from './reportWebVitals';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;
ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

