import React from 'react';
import { Helmet } from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as fetchAction from '../actions/fetch';
/* eslint-disable react/no-multi-comp */ 
const Home = (props) =>{
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
              <title>主页</title>
              <meta property="og:title" content="主页" />
            </Helmet>
        );
    };
    return(
        <>
            {head()}
            <h2 onClick={props.fetch_data}>主页</h2>
            {props.indexData !== null ? props.indexData.dash.map((elm,key)=>{
                return (
                    <div key={key}>
                        <span>{elm.name}</span>
                        <img src={elm.url} />
                        <span>{elm.author}</span>  
                    </div>
                );
            }): '点击主页文字获取数据'}
        </>
    );
};
Home.propTypes = {
    fetch_data: PropTypes.func.isRequired,
    indexData: PropTypes.objectOf(Array)
};
const mapStateToProps = (state)=>{
    return{
        indexData: state.home.indexData
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(fetchAction,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);