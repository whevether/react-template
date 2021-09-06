import React from 'react';
import {NavLink} from 'react-router-dom';
const NavBar = ()=>{
  const activeStyle = { color: 'blue' };
  return (
    <div className="header">
      <NavLink exact to="/" activeStyle={activeStyle}>主页</NavLink>
      {' | '}
      <NavLink to="/redbull" activeStyle={activeStyle}>红牛</NavLink>
      {' | '}
      <NavLink to="/snacks" activeStyle={activeStyle}>说明</NavLink>
      {' | '}
      <NavLink to="/keep" activeStyle={activeStyle}>react v17.2 新api</NavLink>
    </div>
  );
};
export default NavBar;