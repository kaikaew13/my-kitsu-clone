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

exports.addToLibrary = async (req, res, next) => {
  const { animeId, status } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) throw new Error('no user found');
    const found = user.animelist.find(
      (each) => each.animeId.toString() === animeId
    );
    if (found)
      return res.status(200).json({ message: 'anime already in your library' });
    user.animelist.push({ animeId: animeId, status: status });
    const updatedUser = await user.save();
    const message = 'added anime to your library';
    res.status(200).json({
      message: message,
      animeList: updatedUser.animelist,
    });
  } catch (err) {
    errorHandler(err, next);
  }
};
