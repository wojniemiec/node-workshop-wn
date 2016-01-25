console.log('it works');

var stockRepo = require('./repository/stock-repository');

var app = require('./app')(stockRepo);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

