import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
// 登入页布局
const LoginLayout = () => {
  return (
    <div className="LoginLayout-wrapper" >
      <div>登入页面布局</div>
      {/* 路由插槽 */}
      <Outlet />
    </div>
  );
};
LoginLayout.propTypes = {
  routes: PropTypes.object
};
export default connect(state => ({
  state: state
}))(LoginLayout);