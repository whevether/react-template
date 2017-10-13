import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import axios from 'axios';
import {routerMiddleware} from 'react-router-redux';
const axiosInstance = axios.create({
  baseURL: '/api'
});
export default function configureStore(history,initialState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares,routerMiddleware(history))
    )
  );
  return store;
}
