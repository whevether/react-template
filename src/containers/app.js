import React from 'react';
import Navbar from '../components/navbar';
import PropTypes from 'prop-types';
import {withRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {RouteWithSubRoutes} from '../router/routes';
/*把switch 包裹在这里面使用withRouter 保证同步路由数据*/ 
const ConnectedSwitch = withRouter(connect(state => ({
	location: state.location
}))(Switch));
const App = ({route})=>{

    return(
      <div className="main" style={{'textAlign':'center'}}>
        <Navbar />
        <ConnectedSwitch>
          {route ? route.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route}/>
          )): ''}
        </ConnectedSwitch>
      </div>
    );
};
App.propTypes = {
  route: PropTypes.objectOf(Array).isRequired
};
export default withRouter(connect(state => ({
  location: state.location,
}))(App));