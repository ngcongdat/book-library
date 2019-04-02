const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  descripton: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

var Book = mongoose.model("books", BookSchema);

module.exports = Book;
