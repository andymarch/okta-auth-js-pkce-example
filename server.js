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
if (!Object.is) {
    // eslint-disable-next-line no-extend-native
    Object.is = function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      }
      return x !== x && y !== y; // eslint-disable-line no-self-compare
    };
  }
  
  if (!Array.prototype.includes) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.includes = function includes(value) {
      for (let i = 0; i < this.length; i += 1) {
        if (Object.is(this[i], value)) {
          return true;
        }
      }
      return false;
    };
  }
//end polyfill

var port = process.env.PORT || 8080;
app.listen(port);

console.log('server started '+ port);
