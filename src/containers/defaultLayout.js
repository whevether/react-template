import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
// 登入页布局

/*把switch 包裹在这里面使用withRouter 保证同步路由数据*/
const ConnectedSwitch = withRouter(connect(state => ({
  state: state
}))(Switch));
const DefaultLayout = (props) => {
  return (
    <div className="DefaultLayout-wrapper" >
      <Navbar />
      <ConnectedSwitch>
        {props.routes &&
          <Route  key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} />
        }
      </ConnectedSwitch>
    </div>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired
};
export default withRouter(connect(state => ({
  state: state
}))(DefaultLayout));