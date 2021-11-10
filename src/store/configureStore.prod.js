import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {request} from 'utils/request';
import { createReduxHistoryContext } from "redux-first-history";
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
  // // end
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
    history: history,
    //other options if needed 
  });
  const middlewares = [
    routerMiddleware,
    thunkMiddleware.withExtraArgument(request(history)),
  ];
  const store = createStore(rootReducer(routerReducer), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  const h = createReduxHistory(store);
  return {
    store,
    h
  };
}
