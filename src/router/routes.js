import React from 'react';
import {Route} from 'react-router-dom';
// 服务端
import Home from '../components/home';
import RedBull from '../components/redBull';
import Snacks from '../components/snacks'; //包裹了子路由的组件
import NotFoundPage from '../components/nodeFound';
import App from '../containers/app';
/*
  当不需要服务端渲染的时候可以开启代码分割。服务端渲染代码分割这个插件会有问题
*/ 
// import Loadable from 'react-loadable'; 
// import path from 'path';
// 路由加载时动画 
// const MyLoadingComponent = ({ isLoading, error }) => {
//     // Handle the loading state
//     if (isLoading) {
//         return <div>玩命加载中......</div>;
//     }
//     // Handle the error state
//     else if (error) {
//         return <div>对不起。页面加载错误</div>;
//     }
//     else {
//         return null;
//     }
// };
// //分割路由
// const AsyncHome = Loadable({
//     loader: () => import('../components/home'),
//     loading: MyLoadingComponent,
//     delay: 200,
//     serverSideRequirePath: path.join(__dirname, '../components/home')
// }); 
// const AsyncRedBull = Loadable({
//     loader: () => import('../components/redBull'),
//     loading: MyLoadingComponent,
//     delay: 200,
//     serverSideRequirePath: path.join(__dirname, '../components/redBull')
// });
// const AsyncSnacks = Loadable({
//     loader: () => import('../components/snacks'),
//     loading: MyLoadingComponent,
//     delay: 200,
//     serverSideRequirePath: path.join(__dirname, '../components/snacks')
// });
export default [
    {
      component: App,
      routes: [
        {
          component: Home,
          path: '/',
          exact: true
        },
        {
          component:RedBull,
          path: '/redbull'
        },
        {
          component: Snacks,
          path: '/snacks'
        },
        {
          ...NotFoundPage   //没有路由的通配页面 404页面
        }
      ]
    }
  ];
/* eslint-disable react/self-closing-comp */
  export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props=>(
        <route.component {...props} routes={route.routes}/>
    )}>
    </Route>
);