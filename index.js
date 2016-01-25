console.log('it works');


var http = require('http');

var server = http.createServer(function (req, res) {
  res.write('dupa');
  res.end();
});

server.listen(3000, function () {
  console.log('server started');
});

