import React,{Fragment, useState} from "react";
import {head} from 'utils/head';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as fetchAction from "store/actions/fetch";
import "../style/home.scss";
// import { List } from 'antd-mobile';   //测试代码
  
const Home = (props) =>{
    //  这是一个使用redux 封装axios中间件请求示例
    const [count, setCount] = useState(0);
    return(
        <>
            {head('主页')}
            <h2 onClick={props.fetch_data}>主页</h2>
            <h5 style={{cursor: "pointer"}} onClick={()=>setCount(count+1)}>react hook <span style={{color: "green"}}>{count}</span></h5>
            {props.data  === null && <Fragment>点击主页文字获取数据</Fragment>}
            {props.data !== null && <div className="content">
                <h6 style={{color:"red"}}>appkey: {JSON.stringify(props?.data)}</h6>
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