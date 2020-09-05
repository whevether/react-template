import React from 'react';
import {Route/*,Redirect*/} from 'react-router-dom';
import {getCookie} from 'utils/storage';
import PropTypes from 'prop-types';
const ProtectedRoute = ({component: Component,...rest}) => {
  return (
    <Route {...rest} render={
      props=>{
        /**
         * 没有登入跳转到登入页面
         */
        if(!getCookie('openid')) {
          // return(
          //   <Redirect to={{
          //     pathname: '/',
          //     state: {from: props.location}
          //   }} />
          // );
          return Component ? <Component {...props} /> : null;
        }
        return Component ? <Component {...props} /> : null;
      }}
      />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  permission: PropTypes.string,
  location: PropTypes.object
};
export default ProtectedRoute;