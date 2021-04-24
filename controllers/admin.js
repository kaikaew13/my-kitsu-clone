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
  });
  try {
    const res = await anime.save();
    console.log(res);
  } catch (err) {
    errorHandler(err, next);
  }
};
