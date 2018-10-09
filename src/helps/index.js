/* eslint-disable import/default */
import '@babel/polyfill';
// 路由句柄
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
// import {Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'; //push
import configureStore from '../store/configureStore';
// import { renderRoutes } from 'react-router-config';
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import 'style/test.less';
const history = createHistory();
const store = configureStore(history); //第二个参数是初始状态
import Loadable from 'react-loadable';
// store.dispatch(push('/foo'));//用react-router-redux 跳转的栗子
import App from '../containers/app';
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('app')
  );
});