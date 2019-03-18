import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// 登入页布局

/*把switch 包裹在这里面使用withRouter 保证同步路由数据*/
const ConnectedSwitch = withRouter(connect(state => ({
  state: state
}))(Switch));
const ErrorLayout = (props) => {
  return (
    <div className="ErrorLayout-wrapper" >
      <div>错误页面布局</div>
      <ConnectedSwitch>
        {props.routes ? props.routes.map((item, key) => {
          return <Route key={key} exact={item.exact} path={item.path} component={item.component} />;
        })
          : ''}
      </ConnectedSwitch>
    </div>
  );
};
ErrorLayout.propTypes = {
  routes: PropTypes.arrayOf(Object)
};
export default withRouter(connect(state => ({
  state: state
}))(ErrorLayout));