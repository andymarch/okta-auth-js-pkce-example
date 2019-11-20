// server.js
var express = require('express');
const history = require('connect-history-api-fallback');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(serveStatic(__dirname + "/dist"));

//IE11 polyfill for includes
if (!String.prototype.includes) {
    console.log("need includes polyfill")
    String.prototype.includes = function(search, start) {
      'use strict';
    console.log("IE11 polyfill")
      if (search instanceof RegExp) {
        throw TypeError('first argument must not be a RegExp');
      } 
      if (start === undefined) { start = 0; }
      return this.indexOf(search, start) !== -1;
    };
  }
  else{
      console.log("includes polyfill not needed")
  }
//end polyfill

var port = process.env.PORT || 8080;
app.listen(port);

console.log('server started '+ port);
