/* eslint-disable import/default */
import "core-js/stable";
import "regenerator-runtime/runtime";
// 路由句柄
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'store/configureStore';
//GYGBZ-MB5WR-DPZWK-WTKS2-UWBVS-VXBKW
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import 'antd-mobile/dist/antd-mobile.less';
import 'style/index.less';
const history = createBrowserHistory();
const store = configureStore(history); //第二个参数是初始状态
import Loadable from 'react-loadable';
import App from 'containers/app';
Loadable.preloadReady().then(() => {
  // ReactDOM.hydrate  服务端渲染用
  ReactDOM.render(
      <Provider store={store} >
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      document.getElementById('app')
  );
});