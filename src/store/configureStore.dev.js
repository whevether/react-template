
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {request} from 'utils/request';
import { routerMiddleware } from 'connected-react-router';
export default function configureStore(history,initialState) {
  // // 定时刷新爬虫数据
  // let time = 0;
  // try
  // {
  //   time = setInterval(()=>{
  //     axiosInstance.get('/User/WritePneumoniaData')
  //     .then(res => {
  //       console.log(res);
  //     }).catch(err=>{
  //       console.log(err);
  //       clearInterval(time);
  //     });
  //   }, 600000);
  // }catch(err)
  // {
  //   clearInterval(time);
  // }
  // end
  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument(request(history)),
  ];
  const store = createStore(rootReducer(history), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
