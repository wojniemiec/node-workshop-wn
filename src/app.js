var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/books';

var connectionPromise = MongoClient.connect(url);
var dbPromise = connectionPromise.then(function (db) {
  return db.collection('books');
});

app.use(bodyParser.json());

app.get('/', function () {
  //res.send('Hello World!');
  throw new Error('dd');
});

app.get('/stock', function (req, res) {
  dbPromise
    .then(function (collection) {
      return collection.find({}).toArray();
    })
    .then(function (books) {
      return res.json(books);
    });
});

app.post('/stock', function (req, res) {
  var isbn = req.body.isbn;
  var count = req.body.count;

  dbPromise
    .then(function (collection) {
      return collection.updateOne({isbn: isbn}, {
        isbn: isbn,
        count: count
      }, {upsert: true});
    })
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