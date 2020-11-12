import React from 'react';
import {Route} from 'react-router-dom';
import LoadableComponent from './LoadableComponent';
/* eslint-disable react/self-closing-comp */
export const routes = [
  {
    path: '/',
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    exact: true,
    permission: 'home',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/home'))
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/redBull')),
    permission: 'redbull',
    path: '/redbull'
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/snacks')),
    permission: 'snacks',
    path: '/snacks'
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/defaultLayout')),
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/keep')),
    permission: 'keep',
    path: '/keep'
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
    path: '/login',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/login'))
  },
  {
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
    path: '/401',
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/401'))
  }, 
  {
    component: LoadableComponent(() => import(/* webpackPrefetch: true */ '../components/nodeFound')),
    layout: LoadableComponent(() => import(/* webpackPrefetch: true */ '../containers/errorLayout')),
    path: '*'
  }
];
/* eslint-disable react/self-closing-comp */
export const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={props => (
    <route.layout {...props} routes={route} />
  )}>
  </Route>
);