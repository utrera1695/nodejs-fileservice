'use strict';
var http = require('http')
/*var https = require('https')*/
var app = require('./app');
/*var fs = require('fs-extra')*/
var port = process.env.PORT || 8000;
/*var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};*/
var server = http.createServer(app);
server.listen(port);
/*
console.log(sslOptions)
https.createServer(sslOptions, app).listen(port)*/
