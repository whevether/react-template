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
  if(process.env.BUILD_TYPE === 'webpack'){
    if(module.hot){
      // Enable Webpack hot module replacement for reducers
      module?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }else{
    if (import.meta?.hot) {
      // Enable Webpack hot module replacement for reducers
      import.meta?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }
  request(store);
  return {
    store
  };
}