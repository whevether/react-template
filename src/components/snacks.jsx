import React from "react";
import {Link,Outlet} from "react-router-dom";
import {head} from 'utils/head';
// 子组件示例
  
const Snacks = () =>{
    return(
        <>
            {head('子组件')}
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