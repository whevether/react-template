import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from 'router/ProtectedRoute';
import Footer from 'components/tabbar/index';
// 登入页布局

const DefaultLayout = (props) => {
  return (
    <div className="DefaultLayout-wrapper" >
        {props.routes &&
          <ProtectedRoute key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component}/>
        }
        <Footer {...props}/>
    </div>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired
};
export default withRouter(connect(state => ({
  state: state
}))(DefaultLayout));