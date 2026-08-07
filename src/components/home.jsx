import React,{Fragment} from "react";
import {head} from 'utils/head';
import { useHomeData } from "store/hooks/useHomeData";
import { useAppStore } from "store/useAppStore";
import "../style/home.scss";
// import { List } from 'antd-mobile';   //测试代码
  
const Home = () =>{
    // TanStack Query 请求示例；Zustand 客户端状态示例
    const { data = null, refetch } = useHomeData();
    const count = useAppStore((state) => state.count);
    const increment = useAppStore((state) => state.increment);
    return(
        <>
            {head('主页')}
            <h2 onClick={() => refetch()}>主页</h2>
            <h5 style={{cursor: "pointer"}} onClick={increment}>react hook <span style={{color: "green"}}>{count}</span></h5>
            {data  === null && <Fragment>点击主页文字获取数据</Fragment>}
            {data !== null && <div className="content">
                <h6 style={{color:"red"}}>appkey: {JSON.stringify(data)}</h6>
            </div>}
        </>
    );
};
export default Home;
