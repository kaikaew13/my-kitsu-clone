const Anime = require('../models/anime');

const { errorHandler } = require('../helper');

exports.postAnime = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const anime = new Anime({
    title: title,
    description: description,
    score: 10,
    genre: ['comedy'],
    status: 'none',
  });
  try {
    const res = await anime.save();
    console.log('added new anime to the db');
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.getAnime = async (req, res, next) => {
  try {
    const animelist = await Anime.find();
    console.log('fetched animelist successfully');
    res.status(200).json({
      message: 'fetched successfully',
      animelist: animelist,
    });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.getSingleAnime = async (req, res, next) => {
  const animeId = req.params.animeId;
  try {
    const anime = await Anime.findById(animeId);
    if (!anime) {
      const err = new Error('invalid anime id');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ message: 'fetched successfully', anime: anime });
  } catch (err) {
    errorHandler(err, next);
  }
};
