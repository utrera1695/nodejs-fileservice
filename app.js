'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  })
);
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(cors());
//configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY,Origin,X-Rquested-Widht,Content-Type,Accept,Acces-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

var FileController = require('./controller/file.controller');

app.use('/fileapi', FileController);
app.use('/fileapi', function (req, res) {
  res.status(200).send({
    done: true,
  });
});
module.exports = app;
