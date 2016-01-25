var express = require('express');
var bodyParser = require('body-parser');


module.exports = function (stockRepository) {
  var routes = require('./routes')(stockRepository);
  var app = express();

  app.use(bodyParser.json());

  app.get('/stock/:isbn', routes.getCount);
  app.get('/stock', routes.getAllBooks);
  app.post('/stock', routes.saveOrUpdateBook);

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

  return app;

};