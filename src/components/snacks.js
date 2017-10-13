import React from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {RouteWithSubRoutes} from '../router/router';
import PropTypes from 'prop-types';
// 子组件示例
/* eslint-disable react/no-multi-comp */ 
const Snacks = ({routes}) =>{
    const head = ()=>{
        return (
            <Helmet>
              <title>子组件</title>
              <meta property="og:title" content="子组件" />
            </Helmet>
        );
    };
    return(
        <div>
            {head()}
            <h2>小吃</h2>
            <ul>
                <li><Link to="/snacks/one">辣条</Link></li>
                <li><Link to="/snacks/two">薯片</Link></li>
            </ul>
            {routes.map((route,key)=>(
                <RouteWithSubRoutes key={key} {...route}/>
            ))}
        </div>
    );
};
// 新的验证规则模块,从react 中剥离了
Snacks.propTypes = {
    routes: PropTypes.arrayOf(Object).isRequired
};
export default Snacks;