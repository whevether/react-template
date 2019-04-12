import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from 'components/navbar';
// 登入页布局

const DefaultLayout = (props) => {
  return (
    <div className="DefaultLayout-wrapper" >
      <Navbar />
        {props.routes &&
          <Route  key={props.routes.path} exact={props.routes.exact} path={props.routes.path} component={props.routes.component} />
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