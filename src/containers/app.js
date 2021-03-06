import React from 'react';

import PropTypes from 'prop-types';
import { withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteWithSubRoutes, routes } from 'router/routes';
/*把switch 包裹在这里面使用withRouter 保证同步路由数据*/
const ConnectedSwitch = withRouter(connect(state => ({
  state: state
}))(Switch));
const App = () => {
  return (
    <div className="main" >
      <ConnectedSwitch>
        {routes && routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </ConnectedSwitch>
    </div>
  );
};
App.propTypes = {
  route: PropTypes.object,
  routes: PropTypes.arrayOf(Object)
};
export default withRouter(connect(state => ({
  state: state.state,
}))(App));