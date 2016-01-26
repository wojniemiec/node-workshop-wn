console.log('it works');

var stockRepo = require('./repository/stock-repository');

var app = require('./app')(stockRepo);
var port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

