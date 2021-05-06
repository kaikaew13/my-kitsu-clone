const fs = require('fs/promises');
const path = require('path');

const jwt = require('jsonwebtoken');

exports.errorHandler = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;
  return next(err);
};

exports.isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const err = new Error('not authenticated');
    err.statusCode = 401;
    throw err;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret-my-kitsu');
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const err = new Error('not authenticated');
    err.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};

exports.clearImage = async (filePath) => {
  filePath = path.join(__dirname, filePath);
  await fs.unlink(filePath);
};
