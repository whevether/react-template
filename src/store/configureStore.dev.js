
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: '/v2'
});
axiosInstance.interceptors.request.use((config) => {
  return config;
},(error) =>{
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response)=>{
  if(response.status === 200 || response.data.status === 200 || response.data.status === 0){
    return response.data;
  }
},(err)=>{
  const {response} = err;
  if([401,400,403].indexOf(response.status) > -1){
    alert('没有权限');
  }
  if([500].indexOf(response.status) > -1){
    alert('500,服务器错误');
  }
  if([404].indexOf(response.status) > -1){
    alert('没有这个接口');
  }
  if(response.data){
    alert('接口错误');
  }
  return Promise.reject(err);
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
