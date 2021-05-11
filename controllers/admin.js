const { validationResult } = require('express-validator');

const Anime = require('../models/anime');
const { errorHandler, clearImage } = require('../helper');
const User = require('../models/user');

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      const err = new Error('not authorized');
      err.statusCode = 401;
      throw err;
    }
    next();
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.postAnime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('invalid input');
    err.data = errors.array();
    err.statusCode = 403;
    return next(err);
  }
  const imageUrl = '/' + req.file.path;
  const { title, description, genre } = req.body;
  const anime = new Anime({
    title: title,
    description: description,
    score: 10,
    genre: genre.split(','),
    imageUrl: imageUrl,
    status: 'top upcoming anime',
  });
  try {
    await anime.save();
    const message = 'added new anime to the db';
    console.log(message);
    res.status(201).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.putAnime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('invalid input');
    err.data = errors.array();
    err.statusCode = 403;
    return next(err);
  }
  const imageUrl = req.file ? '/' + req.file.path : null;
  const { title, description, genre, animeId } = req.body;
  try {
    const anime = await Anime.findById(animeId);
    if (!anime) {
      const err = new Error('invalid anime id');
      err.statusCode = 404;
      throw err;
    }
    anime.title = title ? title : anime.title;
    anime.description = description ? description : anime.description;
    anime.genre = genre ? genre.split(',') : anime.genre;
    if (imageUrl) {
      clearImage(anime.imageUrl);
      anime.imageUrl = imageUrl;
    }
    await anime.save();
    const message = 'updated anime successfully';
    res.status(200).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};
