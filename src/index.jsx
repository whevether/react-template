import "core-js/stable";
// 路由句柄
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "store/queryClient";
import { request } from "utils/request";
//GYGBZ-MB5WR-DPZWK-WTKS2-UWBVS-VXBKW
//服务端渲染的时候样式需要放在入口这里。放别的地方环境会报错; 
import "style/test.scss";
import App from "router/app";

request();

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
  <QueryClientProvider client={queryClient}>
      <App />
  </QueryClientProvider>
);
