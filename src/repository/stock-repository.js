var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/books';

var connectionPromise = MongoClient.connect(url);
var dbPromise = connectionPromise.then(function (db) {
  return db.collection('books');
});

function getAllBooks() {
  return dbPromise
    .then(function (collection) {
      return collection.find({}).toArray();
    });
}

function saveOrUpdateBook(isbn, count) {
  return dbPromise
    .then(function (collection) {
      return collection.updateOne({isbn: isbn}, {
        isbn: isbn,
        count: count
      }, {upsert: true});
    });
}

module.exports = {
  getAllBooks: getAllBooks,
  saveOrUpdateBook: saveOrUpdateBook
};