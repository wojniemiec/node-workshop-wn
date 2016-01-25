var express = require('express');
var bodyParser = require('body-parser');
var stockRepository = require('./repository/stock-repository');

var app = express();

app.use(bodyParser.json());

app.get('/', function () {
  //res.send('Hello World!');
  throw new Error('not an active endpoint, he he');
});

app.get('/stock', function (req, res, next) {
  stockRepository.getAllBooks()
    .then(function (books) {
      return res.json(books);
    })
    .catch(next);
});

app.post('/stock', function (req, res) {
  var isbn = req.body.isbn;
  var count = req.body.count;

  stockRepository.saveOrUpdateBook(isbn, count)
    .then(function () {
      return res.json({isbn: isbn, count: count});
    });
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