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
  return store;
}
