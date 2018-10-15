
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://www.keep-wan.me/api'
});
export default function configureStore(history,initialState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
