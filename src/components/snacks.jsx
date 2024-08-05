import React from "react";
import {Link,Outlet} from "react-router-dom";
import { Helmet } from "react-helmet";
// 子组件示例
  
const Snacks = () =>{
    const head = ()=>{
        return (
            <Helmet>
              <title>子组件</title>
              <meta property="og:title" content="子组件" />
            </Helmet>
        );
    };
    return(
        <>
            {head()}
            <h2>小吃</h2>
            <ul>
                <li><Link to="/snacks/one">辣条</Link></li>
                <li><Link to="/snacks/two">薯片</Link></li>
            </ul>
            <Outlet />
            {/* <div className="router_sub">
                <Route path="/snacks/one" component={()=><h2>子路由1</h2>} />
                <Route path="/snacks/two" component={() => <h2>子路由2</h2>} />
            </div> */}
        </>
    );
};
export default Snacks;