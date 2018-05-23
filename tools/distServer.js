import express from 'express';
// import path from 'path';
import open from 'open';
import compression from 'compression';
// import bodyParser from 'body-parser';
/* eslint-disable no-unused-vars*/
import React from 'react';
const port = 3000;
const app = express();
// app.set("dist", path.resolve(__dirname,"../dist"));
app.use(compression());
app.use(express.static('dist'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../','dist')));
app.set('views', 'dist');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.get('*',(req,res)=>{
  res.render('index', {req, res});
});
app.get('/',(req,res)=>{
  res.render('index', {req, res});
});
app.listen(port, function(err) {
  /*eslint-disable no-console*/
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
