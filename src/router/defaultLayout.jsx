import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "components/navbar";
import {isGranted,getCookie} from "utils/storage";
import {permission} from "utils/permission";
import {Outlet,Navigate,useLocation} from "react-router-dom";
// 登入页布局

const DefaultLayout = (props) => {
  let path = useLocation();
  const renderProtectedRoute = ()=>{
    if(!getCookie("token")) {
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
            <p className="footer" ><a href="https://beian.miit.gov.cn/" target="_blank">Copyright © 2022 湘ICP备2022009830号</a></p>
          </div>
        );
      }
    }
  };
  return (
    <> 
      {
        !props?.home?.logout && renderProtectedRoute()
      }
      {
        props?.home?.logout && <Navigate to="/login" replace />
      }
    </>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object,
  home: PropTypes.object
};
export default connect(state => ({
  home: state?.home
}))(DefaultLayout);