import './index.css';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import homeReducer from './reducers/index.js';
import App from './components/app.js';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  homeReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
