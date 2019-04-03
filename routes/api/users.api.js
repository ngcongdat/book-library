const express = require("express");

const router = express.Router();

// Load controller
const controller = require("../../controllers/user.controller");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users Works"
  })
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", controller.register);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post("/login", controller.login);

module.exports = router;
