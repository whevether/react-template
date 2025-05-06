import React from "react";
import {head} from 'utils/head';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
  
const RedBull = () =>{
    let navigate = useNavigate();
    const handBack = ()=>{
        // 这两个的效果是一样的;
        navigate(-1);
        // props.history.goBack();
    };
    const handPush = ()=>{
        navigate("/snacks/one");
    };
    return(
        <div className="honeniu">
            {head('红牛')}
            <h2 onClick={handBack}>点击返回上一页</h2>
            <span onClick={handPush}>点击跳转到子路由</span>
        </div>
    );
};
RedBull.propTypes = {
    history: PropTypes.object
};
export default RedBull;