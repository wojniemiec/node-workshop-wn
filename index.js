console.log('it works');


var express = require('express');
var app = express();


app.get('/', function (req, res, next) {
  console.log('only for root / GET request');
  next();
}, function (req, res) {
  res.send('Hello World!');
});

app.use(function (req, res, next) {
  console.log('incoming request!');
  next();
});

app.use(function (req, res, next) {
  console.log('incoming request second middleware!');
  next();
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

