const User = require('../models/user');
const { errorHandler } = require('../helper');
const Anime = require('../models/anime');
const Reaction = require('../models/reaction');

exports.addToLibrary = async (req, res, next) => {
  const { animeId, status } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) throw new Error('no user found');
    const found = user.animelist.find(
      (each) => each.animeId.toString() === animeId
    );
    if (found) throw new Error('anime already in your library');
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

// exports.getAnimelist = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId).populate('animelist.animeId');
//     if (!user) throw new Error('no user found');
//     const message = 'fetched user animelist successfully';
//     res.status(200).json({ message: message, animelist: user.animelist });
//   } catch (err) {
//     errorHandler(err, next);
//   }
// };

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate('animelist.animeId')
      .populate('followers', ['username'])
      .populate('following', ['username']);
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
      },
    });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.followUser = async (req, res, next) => {
  targetUserId = req.body.targetUserId;
  const user = await User.findById(req.userId);
  if (!user) throw new Error('no user found');
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw new Error('no user found');
  user.following.push(targetUserId);
  targetUser.followers.push(user);
  await user.save();
  await targetUser.save();
  const message = 'target user followed';
  res.status(200).json({ message: message });
};

exports.postReaction = async (req, res, next) => {
  const { animeId, reactionMessage } = req.body;
  try {
    const anime = await Anime.findById(animeId);
    if (!anime) {
      const err = new Error('invalid anime id');
      err.statusCode = 404;
      throw err;
    }
    const user = await User.findById(req.userId);
    if (!user) throw new Error('no user found');
    const reaction = new Reaction({
      reactionMessage: reactionMessage,
      userId: req.userId,
      animeId: animeId,
    });
    const savedReaction = await reaction.save();
    user.reactionlist.push(savedReaction);
    await user.save();
    anime.reactionlist.push(savedReaction);
    await anime.save();
    const message = 'posted reaction successfully';
    res.status(201).json({ message: message, reaction: savedReaction });
  } catch (err) {
    errorHandler(err, next);
  }
};
