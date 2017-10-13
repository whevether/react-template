import React from 'react';
import { Helmet } from 'react-helmet';
/* eslint-disable react/no-multi-comp */ 
const Home = () =>{
    const head = () => {
        return (
            <Helmet>
              <title>主页</title>
              <meta property="og:title" content="主页" />
            </Helmet>
        );
    };
    return(
        <div className="home">
            {head()}
            <h2>主页</h2>
        </div>
    );
};
export default Home;