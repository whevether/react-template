import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
/* eslint-disable react/no-multi-comp */ 
const RedBull = () =>{
    let navigate = useNavigate();
    // 演示编程式导航
    const head = ()=>{
        return (
            <Helmet>
              <title>红牛</title>
              <meta property="og:title" content="红牛" />
            </Helmet>
        );
    };
    const handBack = ()=>{
        // 这两个的效果是一样的;
        navigate(-1);
        // props.history.goBack();
    };
    const handPush = ()=>{
        navigate('/snacks/one');
    };
    return(
        <div className="honeniu">
            {head()}
            <h2 onClick={handBack}>点击返回上一页</h2>
            <span onClick={handPush}>点击跳转到子路由</span>
        </div>
    );
};
RedBull.propTypes = {
    history: PropTypes.object
};
export default RedBull;