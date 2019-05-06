import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
import ProtectedRoute from 'router/ProtectedRoute';
// 登入页布局

const DefaultLayout = (props) => {
  return (
    <div className="DefaultLayout-wrapper" >
      <Navbar />
        {props.routes &&
          <ProtectedRoute key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} permission={props.routes.permission}/>
        }
    </div>
  );
};
DefaultLayout.propTypes = {
  routes: PropTypes.object.isRequired
};
export default withRouter(connect(state => ({
  state: state
}))(DefaultLayout));