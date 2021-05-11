const { errorHandler } = require('../helper');
const Anime = require('../models/anime');
const Reaction = require('../models/reaction');
const User = require('../models/user');

exports.getHome = async (req, res, next) => {
  let limit = req.params.limit === 'no-limit' ? null : +req.params.limit;
  let status = req.params.status === 'all' ? null : req.params.status;
  // console.log(status);
  try {
    const animeList = status
      ? await Anime.find({ status: status }).limit(limit)
      : await Anime.find().limit(limit);
    if (!animeList) {
      throw new Error('could not fetch from database');
    }
    const message = 'fetched anime from db successfully';
    // console.log(animeList);
    res
      .status(200)
      .json({ message: message, animeList: animeList, status: status });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.getEachAnime = async (req, res, next) => {
  const animeId = req.params.animeId;
  try {
    const anime = await Anime.findById(animeId)
      .populate('reactionlist', ['reactionMessage', 'upvote'])
      .populate({
        path: 'reactionlist',
        options: {
          sort: { createdAt: -1 },
        },
        model: 'Reaction',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'username',
        }, // deep population
      });
    if (!anime) {
      const err = new Error('not a valid url');
      err.statusCode(404);
      throw err;
    }
    const message = 'fetched anime from db successfully';
    res.status(200).json({ message: message, anime: anime });
  } catch (err) {
    errorHandler(err, next);
  }
};

// exports.getEachReaction = async (req, res, next) => {
//   const animeId = req.params.animeId;
//   try {
//     const anime = await Anime.findById(animeId);
//     if (!anime) {
//       const err = new Error('not a valid url');
//       err.statusCode(404);
//       throw err;
//     }
//     const reactions = await Reaction.find({
//       animeId: animeId,
//     })
//       .sort({ createdAt: -1 }) //sort by newest first
//       .populate('userId', ['username', '_id']);
//     const message = 'fetched reaction successfully';
//     res.status(200).json({ message: message, reactions: reactions });
//   } catch (err) {
//     errorHandler(err, next);
//   }
// };

exports.getEachReaction = async (req, res, next) => {
  const reactionId = req.params.reactionId;
  try {
    const reaction = await Reaction.findById(reactionId)
      .populate('animeId', ['title', 'imageUrl'])
      .populate('userId', ['username']);
    if (!reaction) {
      const err = new Error('failed to fetch the reaction');
      err.statusCode = 404;
      throw err;
    }
    const message = 'fetched reaction successfully';
    res.status(200).json({ message: message, reaction: reaction });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.getOtherUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId)
      .populate('animelist.animeId')
      .populate('followers', ['username'])
      .populate('following', ['username'])
      .populate('reactionlist', ['reactionMessage', 'upvote', 'animeId']);
    if (!user) throw new Error('no user found');
    const message = 'fetched user successfully';
    res.status(200).json({
      message: message,
      user: {
        _id: user._id,
        animelist: user.animelist,
        followers: user.followers,
        following: user.following,
        username: user.username,
        role: user.role,
        reactionlist: user.reactionlist,
      },
    });
  } catch (err) {
    errorHandler(err, next);
  }
};
