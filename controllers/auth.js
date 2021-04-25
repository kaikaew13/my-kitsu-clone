const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { errorHandler } = require('../helper');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('invalid input');
    err.data = errors.array();
    return errorHandler(err, next);
  }
  const { email, password, username } = req.body;
  const role = req.body.role ? req.body.role : 'user';
  try {
    const hasedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hasedPassword,
      username: username,
      role: role,
    });
    await user.save();
    const message = 'signed up successfully';
    console.log(message);
    res.status(201).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};
