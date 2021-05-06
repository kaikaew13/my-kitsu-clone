const Anime = require('../models/anime');

const { errorHandler } = require('../helper');

exports.postAnime = async (req, res, next) => {
  const imageUrl = '/' + req.file.path;
  const { title, description, genre } = req.body;
  const anime = new Anime({
    title: title,
    description: description,
    score: 10,
    genre: genre.split(' '),
    imageUrl: imageUrl,
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
