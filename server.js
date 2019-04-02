const express = require('express');
const mongoose = require('mongoose');

const db = require('./configs/key').mongoRI;
const users = require('./routes/api/users');
const books = require('./routes/api/books');

const app = express();
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use('/api/users', users);
app.use('/api/books', books);

app.get('/', function (req, res) {
  res.send(`<h2>Running app!!<h2>`)
})

app.listen(port, () => {
  console.log(`Connected in ${port}`);
})