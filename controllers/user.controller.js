const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

// Load validation
const validateRegister = require("../validate/register.validate");
const validateLogin = require("../validate/login.validate");

// Load User model
const User = require("../models/user.model");

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
          signed: true
        });
        res.json({ msg: "Success" });
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
};
