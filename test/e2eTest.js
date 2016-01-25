var request = require('supertest');
var assert = require('assert');

var mockStockRepo = require('./mocks/stock-repository-mock')();

var app = require('../src/app')(mockStockRepo);

describe('stock', function () {
  it('should respond to POST stock', function (done) {

    request(app)
      .post('/stock')
      .send({
        isbn: 12345
      })
      .expect('Content-Type', /json/)
      .expect(200)

      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.equal(res.body.isbn, 12345);
        done();
      })
  })
});

