require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const users = require("./routes/api/users.api");
const books = require("./routes/api/books.api");

const app = express();
const db = require("./configs/key").mongoRI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Initial port server
const port = process.env.PORT || 5000;

app.use(passport.initialize());

// Passport config
require("./configs/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("abc"));

app.use("/api/users", users);
app.use("/api/books", books);

app.listen(port, () => {
  console.log(`Connected in ${port}`);
});
