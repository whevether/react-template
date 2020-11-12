import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isGranted,getCookie} from 'utils/storage';
import PropTypes from 'prop-types';
const ProtectedRoute = ({component: Component,permission,...rest}) => {
  return (
    <Route {...rest} render={
      props=>{
        /**
         * 没有登入跳转到登入页面
         */
        if(!getCookie('token')) {
          return(
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }} />
          );
        }
        /**
         * 没有权限跳转到 401页面
         */
        if(permission && !isGranted(permission)) {
          return (
            <Redirect 
              to={{
                pathname: '/401',
                state: {from: props.location}
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : null;
      }}
      />
  );
};
ProtectedRoute.propTypes = {
  Component: PropTypes.func,
  permission: PropTypes.string,
  location: PropTypes.object
};
export default ProtectedRoute;