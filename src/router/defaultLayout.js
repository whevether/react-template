import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
import {isGranted,getCookie} from 'utils/storage';
import {permission} from 'utils/permission';
import {Outlet,Navigate,useLocation} from 'react-router-dom';
// 登入页布局

const DefaultLayout = () => {
  let path = useLocation();
  const renderProtectedRoute = ()=>{
    if(!getCookie('token')) {
      return(
        <Navigate to="/login" replace />
      );
    }else{
      if(path?.pathname && !isGranted(permission[path?.pathname])){
        return(
          <Navigate to="/401" replace />
        );
      }else{
        return(
          <div className="DefaultLayout-wrapper" >
            <Navbar />
            {/* 路由占位符  */}
            <Outlet />
          </div>
        );
      }
    }
  };
  return (
    renderProtectedRoute()
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object
};
export default connect(state => ({
  state: state
}))(DefaultLayout);