const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { errorHandler } = require('../helper');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('invalid input');
    err.data = errors.array();
    err.statusCode = 403;
    return next(err);
  }
  const { email, password, username } = req.body;
  const role = req.body.role ? req.body.role : 'user';
  try {
    console.log(email);
    let exist = await User.find({ email: email });
    console.log(exist);
    if (exist.length > 0) {
      const err = new Error('email already exist');
      err.statusCode = 409;
      throw err;
    }
    exist = await User.find({ username: username });
    if (exist.length > 0) {
      const err = new Error('username already exist');
      err.statusCode = 409;
      throw err;
    }
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error('no user with this email');
      err.statusCode = 401;
      throw err;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error('wrong password');
      err.statusCode = 401;
      throw err;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      'secret-my-kitsu',
      { expiresIn: '1h' }
    );
    const message = 'logged in successfully';
    res.status(200).json({ token: token, message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};
