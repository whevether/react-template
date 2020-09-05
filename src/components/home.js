import React,{/*Fragment*/useState} from 'react';
import { Helmet } from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Address from './address/index';
import * as fetchAction from 'store/actions/fetch';
// import { List } from 'antd-mobile';   //测试代码
/* eslint-disable react/no-multi-comp */ 
const Home = (props) =>{
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
              <title>首页</title>
              <meta property="og:title" content="首页" />
            </Helmet>
        );
    };
    const [count, setCount] = useState(0);
    return(
        <>
            {head()}
            <Address color={{color:'#fff'}} />
            <h2 onClick={props.fetchPublicKey}>主页</h2>
            <h5 style={{cursor: 'pointer'}} onClick={()=>setCount(count+1)}>react hook <span style={{color: 'green'}}>{count}</span></h5>
        </>
    );
};
Home.propTypes = {
    fetchPublicKey: PropTypes.func.isRequired,
    data: PropTypes.objectOf(Array)
};
const mapStateToProps = (state)=>{
    return{
        data: state.common.data
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(fetchAction,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);