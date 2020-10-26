import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom'

import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;
ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
    </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
