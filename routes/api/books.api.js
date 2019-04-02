const express = require("express");
var router = express.Router();

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Books Works"
  })
);

module.exports = router;
