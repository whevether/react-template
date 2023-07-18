import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Outlet} from 'react-router-dom';
// 登入页布局

const RootLayout = () => {
  return (
    <div className="root-layout" >
      {/* 路由占位符  */}
      <Outlet />
    </div>
  );
};
RootLayout.propTypes = {
  routes: PropTypes.object
};
export default connect(state => ({
  home: state?.home
}))(RootLayout);