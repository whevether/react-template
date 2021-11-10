import React from 'react';
import PropTypes from 'prop-types';
import {/*Routes, Route*/ useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
//总布局
import RootLayout from './rootLayout';
//默认布局
import DefaultLayout from './defaultLayout';
//默认布局
import LoginLayout from './loginLayout';
/* 页面 */
import Home from '../components/home';
import RedBull from '../components/redBull';
import Snacks from '../components/snacks';
import One from '../components/one';
import Two from '../components/two';
import NotFound from '../components/nodeFound';
import Error401 from '../components/401';
import Keep from '../components/keep';
import Login from '../components/login';
/* Routes 相当于 v4 v5中的switch路由 */
const routes = [{
  path: "/",
  element: <RootLayout />,
  children:[{
    element: <DefaultLayout />,
    children: [{
      index: true,
      element: <Home />
    },{
      path: 'redbull',
      element: <RedBull />
    },{
      path: 'snacks',
      element: <Snacks />,
      children: [{
        path: 'one',
        index: true,
        element: <One />
      },{
        path: 'two',
        element: <Two />
      }]
    },{
      path: 'keep',
      element: <Keep />
    }]
  },{
    path: 'login',
    element: <LoginLayout />,
    children: [{
      index: true,
      element: <Login />
    }]
  },{
    path: '401',
    element: <Error401 />
  },{
    path: '*',
    element: <NotFound />
  }]
}];
// react路由.
const App = () => {
  return (
    <div className="main" >
      {useRoutes(routes)}
      {/* <Routes>
        // 根布局
        <Route path="/" element={<RootLayout />}>
          // 默认布局
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route element={<RedBull />} path="redbull"/>
            // 子路由
            <Route path="snacks" element={<Snacks />}>
              <Route path="one" element={<One />} />
              <Route path="two" element={<Two />} />
            </Route>
            <Route element={<Keep />} path="keep"/>
          </Route>
          // 登录页面布局
          <Route element={<LoginLayout />}>
            <Route element={<Login />} path="login" index/>
          </Route>
          // 401页面
          <Route element={<Error401 />} path="401"/>
          // 没有找到页面
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes> */}
    </div>
  );
};
App.propTypes = {
  route: PropTypes.object,
  routes: PropTypes.arrayOf(Object)
};
export default connect(state => ({
  state: state.state,
}))(App);