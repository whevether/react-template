import React,{Fragment, useState} from 'react';
import { Helmet } from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as fetchAction from 'store/actions/fetch';
// import { List } from 'antd-mobile';   //测试代码
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
    const [count, setCount] = useState(0);
    return(
        <>
            {head()}
            <h2 onClick={props.fetch_data}>主页</h2>
            <h5 style={{cursor: 'pointer'}} onClick={()=>setCount(count+1)}>react hook <span style={{color: 'green'}}>{count}</span></h5>
            {props.data  === null && <Fragment>点击主页文字获取数据</Fragment>}
            {props.data !== null && <div className="content">
                <h6>{props.data.title}</h6>
                {props.data.subjects.map((item,i)=>{
                    return(
                        <div className="item-wrapper" key={i}>
                            <h3>{item.title}</h3>
                            <img src={item.images.large}/>
                            <div>上映年份{item.year}</div>
                            <div>上映年份{item.year}</div>
                        </div>
                    );
                })}
            </div>}
        </>
    );
};
Home.propTypes = {
    fetch_data: PropTypes.func.isRequired,
    data: PropTypes.objectOf(Array)
};
const mapStateToProps = (state)=>{
    return{
        data: state.home.data
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(fetchAction,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);