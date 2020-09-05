import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// 登入页布局

const ErrorLayout = (props) => {
  return (
    <div className="ErrorLayout-wrapper" >
      {props.routes &&
          <Route  key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} />
        }
    </div>
  );
};
ErrorLayout.propTypes = {
  routes: PropTypes.object.isRequired
};
export default withRouter(connect(state => ({
  state: state
}))(ErrorLayout));