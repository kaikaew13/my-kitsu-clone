const User = require('../models/user');
const { errorHandler } = require('../helper');

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

exports.getAnimelist = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('animelist.animeId');
    if (!user) throw new Error('no user found');
    const message = 'fetched user animelist successfully';
    res.status(200).json({ message: message, animelist: user.animelist });
  } catch (err) {
    errorHandler(err, next);
  }
};
