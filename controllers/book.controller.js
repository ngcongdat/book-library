// Load Book model
const Book = require("../models/book.model");

module.exports.showBooks = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  const perPage = 9;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  return Book.find().then(books =>
    res.json(books.sort((a, b) => b.readTime - a.readTime).slice(start, end))
  );
};

module.exports.viewBook = function(req, res) {
  var bookId = req.query.b;
  Book.findById(bookId, async function(err, doc) {
    if (err) {
      return res.status(400).json({ mgs: "Book not found" });
    }
    doc.readTime = doc.readTime + 1;
    await doc.save();
    return Book.find().then(books => res.json(books));
  });
};
