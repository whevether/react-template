/* eslint-disable import/default */
import 'babel-polyfill';
// 路由句柄
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {BrowserRouter as Router,Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'; //push
import configureStore from '../store/configureStore';
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import 'style/test.scss';
// 父级容器
import App from '../containers/app';
const history = createHistory();
const store = configureStore(history); //第二个参数是初始状态
// store.dispatch(push('/foo'));//用react-router-redux 跳转的栗子
export default function renderRouter(routes)
{
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Router basename="/" >
            <App>
              <Switch> 
                  {routes}
              </Switch>
            </App>
          </Router>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
}
renderRouter.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(Object).isRequired
};
