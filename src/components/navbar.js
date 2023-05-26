import React from 'react';
import {NavLink} from 'react-router-dom';
const NavBar = ()=>{
  return (
    <div className="header">
      <NavLink  to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>主页</NavLink>
      {' | '}
      <NavLink to="/redbull" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>红牛</NavLink>
      {' | '}
      <NavLink to="/snacks" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>说明</NavLink>
      {' | '}
      <NavLink to="/keep" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>react v18 新api</NavLink>
    </div>
  );
};
export default NavBar;