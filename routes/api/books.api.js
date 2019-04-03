const express = require("express");
const router = express.Router();

const Book = require("../../models/book.model");

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", async function(req, res) {
  var page = parseInt(req.query.page) || 1;
  const perPage = 9;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const books = await Book.find();
  return Book.find().then(books =>
    res.json(books.sort((a, b) => b.readTime - a.readTime).slice(start, end))
  );
});

module.exports = router;
