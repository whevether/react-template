import React from 'react';
import { Helmet } from 'react-helmet';
/* eslint-disable react/no-multi-comp */ 
const RedBull = () =>{
    const head = ()=>{
        return (
            <Helmet>
              <title>红牛</title>
              <meta property="og:title" content="红牛" />
            </Helmet>
        );
    };
    return(
        <div className="honeniu">
            {head()}
            <h2>红牛</h2>
        </div>
    );
};
export default RedBull;