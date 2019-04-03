const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    default: 0
  }
});

var Book = mongoose.model("books", BookSchema);

module.exports = Book;
