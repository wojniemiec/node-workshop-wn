var _ = require('lodash');

module.exports = function () {

  var books = [];

  return {
    getAllBooks: function () {
      return Promise.resolve(books);
    },
    saveOrUpdateBook: function (isbn, count) {
      var item = this._findItem(isbn);
      if (item) {
        item.count = count;
      } else {
        books.push({isbn: isbn, count: count});
      }
      return Promise.resolve();
    },
    _findItem: function (isbn) {
      return _.find(books, function (book) {
        return book.isbn === isbn;
      });
    },
    getBook: function (isbn) {
      var item = this._findItem(isbn);
      if (item) {
        return Promise.resolve(item);
      } else {
        return Promise.resolve(null);
      }
    }
  };
};