import '@babel/polyfill';
/* eslint-disable no-unused-vars*/
import React from 'react';
import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';
import renderer from '../render/index';
import { matchRoutes } from 'react-router-config';
import routes from '../../src/router/routes';
// 状态
import createStore from '../store/configureStore';
const port = 3000;
const app = express();
app.use(express.static('dist'));
// app.set("dist", path.resolve(__dirname,"../../dist"));
app.use(compression());
app.use(express.static('dist'));
// app.set('views', 'dist');
// app.engine('html',require('ejs').renderFile);
// app.set('view engine', 'html');
//会报一个错误，bug;  应该是使用了react-router-redux 的问题；  同步路由的时候。还未加载出dom  但应该是不影响使用的; 
app.get('*',(req,res)=>{
  const {store,history} = createStore(req.path);
  const promises = matchRoutes(routes, req.path)
  .map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  })
  .map(promise => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
    }
  });
  Promise.all(promises)
    .then(()=>{
      const context = {};
      const content = renderer(req, store, context,history);
    
      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }
      res.status(200).send(content);
    });
});
app.listen(port, function(err) {
  /*eslint-disable no-console*/
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
