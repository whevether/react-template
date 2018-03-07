import express from 'express';
import webpack from 'webpack';
import config from '../../webpack.config.dev'; 
import open from 'open'; 
/*eslint-disable no-unused-vars*/
import React from 'react';
// import path from 'path';
import renderer from '../render/index';
import { matchRoutes } from 'react-router-config';
import routes from '../../src/router/routes';
// 状态
import createStore from '../store/configureStore';
/* eslint-disable no-console */
const port = 3000;

const app = express();
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));

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
//开启http 服务
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
