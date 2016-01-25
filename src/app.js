var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function () {
  //res.send('Hello World!');
  throw new Error('dd');
});

app.post('/stock', function (req, res) {
  console.log('dziala post?');
  res.send(req.body);
});


app.use(function (req, res, next) {
  res.status(404).send({
    message: 'not fouuund',
    code: 404
  });
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({
      message: 'server errorek',
      error: (process.env.NODE_ENV === 'production') ? {} : err.stack
    });

  next(err);
});


module.exports = app;