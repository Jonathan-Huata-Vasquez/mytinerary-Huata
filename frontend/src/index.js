import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'
const miStore = createStore(mainReducer,applyMiddleware(thunk))
ReactDOM.render(
  <Provider store = {miStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);


