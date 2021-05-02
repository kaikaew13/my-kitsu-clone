import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import webGeneralReducer from './redux/reducer/web-general';
import authReducer from './redux/reducer/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  webGeneral: webGeneralReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
