const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load validation
const validateRegister = require("../validate/register.validate");
const validateLogin = require("../validate/login.validate");
const keys = require("../configs/key");

// Load User model
const User = require("../models/user.model");

// Set cookie
module.exports.cookie = function(req, res) {
  if (!req.signedCookies.cookie) {
    res.json({ login: false });
  } else {
    res.json({ login: true });
  }
};

// Clear cookie
module.exports.clearCookie = function(req, res) {
  res.clearCookie("cookie");
};

// Verify User
module.exports.verifyUser = passport.authenticate("jwt", { session: false });

module.exports.returnUser = function(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

// Register
module.exports.register = function(req, res) {
  const { errors, isValid } = validateRegister(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

// Login
module.exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLogin(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.cookie("cookie", user._id, {
          maxAge: 90000,
          signed: true
        });

        // Create JWT Payload
        const payload = { id: user._id };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
};
