import React from 'react';
import Navbar from '../components/navbar';
import PropTypes from 'prop-types';
// 这个相当于路由导航组件
const App = (props)=>{
    return(
      <div className="main" style={{'textAlign':'center'}}>
        <Navbar />
        {props.children}
      </div>
    );
};
App.propTypes = {
  children: PropTypes.element
};
export default App;