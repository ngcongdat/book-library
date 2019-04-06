const express = require("express");
const passport = require("passport");
const router = express.Router();
// Load controller
const controller = require("../../controllers/user.controller");

// @route   GET api/users/cookie
// @desc    Set cookie
// @access  Public
router.get("/cookie", controller.cookie);

// @route   GET api/users/clear-cookie
// @desc    Clear cookie
// @access  Public
router.get("/clear-cookie", controller.clearCookie);

// @route   get api/users/verify-user
// @desc    Check user
// @access  Private
router.get("/verify-user", controller.verifyUser, controller.returnUser);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", controller.register);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post("/login", controller.login);

module.exports = router;
