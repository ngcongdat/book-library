const express = require("express");
const router = express.Router();

// Load controller
const controller = require("../../controllers/book.controller");

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/showbooks", controller.showBooks);

router.get("/book", controller.viewBook);

module.exports = router;
