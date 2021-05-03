const { errorHandler } = require('../helper');
const Anime = require('../models/anime');
const User = require('../models/user');

exports.getHome = async (req, res, next) => {
  const status = 'none';
  try {
    const animeList = await Anime.find({ status: status });
    if (!animeList) {
      throw new Error('could not fetch from database');
    }
    const message = 'fetched anime from db successfully';
    res.status(200).json({ message: message, animeList: animeList });
  } catch (err) {
    errorHandler(err, next);
  }
};
