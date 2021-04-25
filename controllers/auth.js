const bcrypt = require('bcryptjs');

const { errorHandler } = require('../helper');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  const role = req.body.role ? req.body.role : 'user';
  const user = new User({
    email: email,
    password: password,
    username: username,
    role: role,
  });
  try {
    await user.save();
    const message = 'signed up successfully';
    console.log(message);
    res.status(201).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};
