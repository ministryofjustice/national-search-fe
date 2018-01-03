/* polyfills */
import 'core-js/fn/array/from';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
