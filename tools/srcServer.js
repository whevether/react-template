import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev'; 
import open from 'open'; 
/*eslint-disable no-unused-vars*/
import React from 'react';
import path from 'path';
/* eslint-disable no-console */
const port = 3000;

const app = express();
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  // serverSideRender: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));
// app.use(express.static(path.join(__dirname, '../','dist')));
app.set('views', 'dist');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/index.html'));
});
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/index.html'));
});
//开启http 服务
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
