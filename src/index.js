/**
 * Created by keep_wan on 2017/1/9.
 * 使用  路由句柄例子
 * 至于数据验证 react 15.5.0 之后分离了.
 */
import React from 'react';
import {RouteWithSubRoutes,routes} from './router/router';
import renderRouter from './helps/renderRouter';
const index = routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ));
renderRouter(index);