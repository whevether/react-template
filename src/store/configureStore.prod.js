import {createStore, compose, applyMiddleware} from 'redux';
import {withExtraArgument} from 'redux-thunk';
import rootReducer from './reducers';
import {request,axiosInstance} from 'utils/request';
export default function configureStore(initialState) {
  const middlewares = [
    withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer(), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  request(store);
  return {
    store
  };
}