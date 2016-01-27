module.exports = function (stockRepository) {
  return {
    getCount: function (req, res, next) {
      var isbn = req.params.isbn;
      stockRepository.getBook(isbn)
        .then(function (book) {
          if (!book) {
            res.status(404).send('book with isbn ' + isbn + ' not found');
            return;
          }

          res.format({
            'text/html': function () {
              res.send('<span>' + book.count + '</span>');
            },
            'application/json': function () {
              res.json(book.count);
            },
            'default': function () {
              res.json(book.count);
            }
          });
        })
        .catch(next);
    },

    getAllBooks: function (req, res, next) {
      stockRepository.getAllBooks()
        .then(function (books) {
          return res.json(books);
        })
        .catch(next);
    },

    saveOrUpdateBook: function (req, res, next) {
      var isbn = req.body.isbn;
      var count = req.body.count;

      stockRepository.saveOrUpdateBook(isbn, count)
        .then(function () {
          return res.json({isbn: isbn, count: count});
        })
        .catch(next);
    }
  };

};