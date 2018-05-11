var express = require('express');
var proxy = require('http-proxy-middleware');
 
var app = express();
 
app.use('/admin', proxy({target: 'http://localhost:8081', changeOrigin: true}));
app.listen(3000);