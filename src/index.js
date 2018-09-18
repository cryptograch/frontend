import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.css';
import App from './components/App/App';
import { Router } from 'react-router-dom'


// import connect redux to react
import { Provider } from 'react-redux'
// import tools from redux lib
import { createStore, applyMiddleware, compose } from 'redux'
// thunk lib need for middleware in redux
import thunk from 'redux-thunk'

// import all custom reducers

import reducers from './reducers/index'

// Configure redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));




ReactDOM.render((<Provider store={store}>
  <App />
</Provider>), document.getElementById('root'));
