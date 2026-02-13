
import "core-js/stable";
// 路由句柄
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {configureStore} from "store/configureStore";
//GYGBZ-MB5WR-DPZWK-WTKS2-UWBVS-VXBKW
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import "style/test.scss";
const {store} = configureStore(); //第二个参数是初始状态
import App from "router/app";
const loading = () => {
  setTimeout(() => {
    if (document.getElementById("scene")) {
      document.getElementById("scene").remove();
    }
    //删除加载动画js,防止继续运行消耗内存
    for(let src of document.getElementsByClassName("loading")){
      src.parentNode.removeChild(src);
    }
  }, 1500);
};
loading();
// ReactDOM.hydrate  服务端渲染用
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Provider store={store} >
      <App />
  </Provider>
);
