import React from 'react';
import {Route} from 'react-router-dom';
import LoadableComponent from './LoadableComponent';
/* eslint-disable react/self-closing-comp */
export const routes = [
  {
    path: '/',
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    exact: true,
    permission: 'home',
    component: LoadableComponent(() => import('../components/home'))
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/redBull')),
    permission: 'redbull',
    path: '/redbull'
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/snacks')),
    permission: 'snacks',
    path: '/snacks'
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/keep')),
    permission: 'keep',
    path: '/keep'
  },
  {
    layout: LoadableComponent(() => import('../containers/errorLayout')),
    path: '/401',
    component: LoadableComponent(() => import('../components/401'))
  }, 
  {
    component: LoadableComponent(() => import('../components/nodeFound')),
    layout: LoadableComponent(() => import('../containers/errorLayout')),
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