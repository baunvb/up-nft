import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import createSagaMiddleware from 'redux-saga'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reportWebVitals from './reportWebVitals';
import AppReducer from './data/reducer';
import rootSaga from './data/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(AppReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
