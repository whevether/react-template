
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../src/reducers';
import axios from 'axios';
import createHistory from 'history/createMemoryHistory';
import {routerMiddleware} from 'react-router-redux';
const axiosInstance = axios.create({
  baseURL: '/api'
});
export default function configureStore(path='/',initialState) {
  const history = createHistory({ initialEntries: [path] });
  const middlewares = [
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares,routerMiddleware(history))
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../src/reducers', () => {
      const nextReducer = require('../../src/reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return {
    store,
    history
  };
}
