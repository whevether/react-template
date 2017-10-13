import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';
import renderer from '../render/index';
// 状态
import createStore from '../store/configureStore';
/* eslint-disable no-unused-vars*/
import React from 'react';
const port = 3000;
const app = express();
app.set("dist", path.resolve(__dirname,"../../dist"));
app.use(compression());
app.use(express.static('dist'));
//会报一个错误，bug;  应该是使用了react-router-redux 的问题；  同步路由的时候。还未加载出dom  但应该是不影响使用的; 
app.get('*',(req,res)=>{
  const {store,history} = createStore(req.path);
  const context = {};
  const content = renderer(req, store, context,history);

  if (context.url) {
    return res.redirect(301, context.url);
  }
  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
});
app.listen(port, function(err) {
  /*eslint-disable no-console*/
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
