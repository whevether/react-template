import React from 'react';
import { Route } from 'react-router-dom';
import LoadableComponent from './LoadableComponent';

export const routes = [
  {
    path: '/',
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    exact: true,
    component: LoadableComponent(() => import('../components/home'))
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/redBull')),
    path: '/redbull'
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/snacks')),
    path: '/snacks'
  },
  {
    layout: LoadableComponent(() => import('../containers/defaultLayout')),
    component: LoadableComponent(() => import('../components/keep')),
    path: '/keep'
  },
  {
    layout: LoadableComponent(() => import('../containers/errorLayout')),
    path: '/login',
    component: LoadableComponent(() => import('../components/keep'))
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