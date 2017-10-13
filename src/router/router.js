/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */ 
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Route} from 'react-router-dom';
// 服务端
import Home from '../components/home';
import RedBull from '../components/redBull';
import Snacks from '../components/snacks'; //包裹了子路由的组件
// Snacks 的子路由 栗子
const One = () => <h2>子路由1</h2>;
const Two = () => <h2>子路由2</h2>;
// 客户端分割代码  需要时打开注释,并注释服务端渲染路由 
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
//分割路由
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
// 这里是客户端路由分割大代码的配置。 服务端分割代码之后会报错
// export const routes = [
//     {
//         path: '/',
//         component: AsyncHome,
//         exact: true
//     },
//     {
//         path: '/redbull',
//         component: AsyncRedBull
//     },
//     {
//         path: '/snacks',
//         component: AsyncSnacks,
//         routes: [{
//          path: '/snacks/one',
//          component: One
//         }, {
//           path: '/snacks/two',
//           component: Two
//         }]
//     },{
//         path: '*',
//         component: ()=>(<h1>404没有找到页面</h1>)
//     }
// ];
//服务端渲染路由开这里这里是没有分割代码 
export const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/redbull',
        component:RedBull
    },
    {
        path: '/snacks',
        component: Snacks,
        routes: [{
         path: '/snacks/one',
         component: One
        }, {
          path: '/snacks/two',
          component: Two
        }]
    },{
        path: '*',
        component: ()=>(<h1>404没有找到页面</h1>)
    }
];
// 把 <Route> 组件像这样包一层，然后在需要使用 <Route> 的地方使用 <RouteWithSubRoutes>
// 自路由可以加到任意路由组件上。
export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props=>(
        <route.component {...props} routes={route.routes}/>
    )}>
    </Route>
);
