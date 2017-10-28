import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../src/reducers';
import createHistory from 'history/createMemoryHistory';
import axios from 'axios';
import {routerMiddleware} from 'react-router-redux';
const axiosInstance = axios.create({
  baseURL: 'https://shop.keep-wan.me/api'
});
export default function configureStore(path='/') {
  const initialState = {};
  const history = createHistory({ initialEntries: [path] });
  const middlewares = [
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares,routerMiddleware(history))
    )
  );
  return {
    store,
    history
  };
}
