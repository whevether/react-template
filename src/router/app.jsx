import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import {/*Routes, Route*/ useRoutes } from "react-router-dom";
import { connect } from "react-redux";
//总布局
import RootLayout from "./rootLayout";
//默认布局
import DefaultLayout from "./defaultLayout";
//默认布局
import LoginLayout from "./loginLayout";
const loadComponent = (c) => (
 <Suspense
    fallback={
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div>加载中...</div>
      </div>
    }
  >{c}</Suspense>
  );
/* 页面 */
const Home = lazy(() => import(/* webpackPrefetch: true */"../components/home"));
const RedBull = lazy(() => import(/* webpackPrefetch: true */"../components/redBull"));
const Snacks = lazy(() => import(/* webpackPrefetch: true */"../components/snacks"));
const One = lazy(() => import(/* webpackPrefetch: true */"../components/one"));
const Two = lazy(() => import(/* webpackPrefetch: true */"../components/two"));
const NotFound = lazy(() => import(/* webpackPrefetch: true */"../components/nodeFound"));
const Error401 = lazy(() => import(/* webpackPrefetch: true */"../components/401"));
const Keep = lazy(() => import(/* webpackPrefetch: true */"../components/keep"));
const Login = lazy(() => import(/* webpackPrefetch: true */"../components/login"));
/* Routes 相当于 v4 v5中的switch路由 */
const routes = [{
  path: "/",
  element: <RootLayout />,
  children: [{
    element: <DefaultLayout />,
    children: [{
      index: true,
      element: loadComponent(<Home />)
    }, {
      path: "redbull",
      element: loadComponent(<RedBull />)
    }, {
      path: "snacks",
      element: loadComponent(<Snacks />),
      children: [{
        path: "one",
        index: true,
        element: loadComponent(<One />)
      }, {
        path: "two",
        element: loadComponent(<Two />)
      }]
    }, {
      path: "keep",
      element: loadComponent(<Keep />)
    }]
  }, {
    path: "login",
    element: <LoginLayout />,
    children: [{
      index: true,
      element: loadComponent(<Login />)
    }]
  }, {
    path: "401",
    element: loadComponent(<Error401 />)
  }, {
    path: "*",
    element: loadComponent(<NotFound />)
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