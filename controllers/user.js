const User = require('../models/user');
const { errorHandler } = require('../helper');
const Anime = require('../models/anime');
const Reaction = require('../models/reaction');
const { getIo, getClientSockets } = require('../socket');

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
  if (getClientSockets()[req.userId])
    getClientSockets()[req.userId].emit(
      'follow-user-sender',
      `followed ${targetUserId}`
    );
  if (getClientSockets()[targetUserId])
    getClientSockets()[targetUserId].emit(
      'follow-user-receiver',
      `${req.userId} is following`
    );
  const message = 'target user followed';
  res.status(200).json({ message: message });
};

exports.unfollowUser = async (req, res, next) => {
  const targetUserId = req.body.targetUserId;
  try {
    const user = await User.findById(req.userId);
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) throw new Error('db failed to fetch target user');
    const updatedFollowingArray = user.following.filter(
      (each) => each.toString() !== targetUserId.toString()
    );
    user.following = updatedFollowingArray;
    const updatedFollowerArray = targetUser.followers.filter(
      (each) => each.toString() !== req.userId.toString()
    );
    targetUser.followers = updatedFollowerArray;
    await user.save();
    await targetUser.save();
    if (getClientSockets()[req.userId])
      getClientSockets()[req.userId].emit(
        'unfollow-user-sender',
        `unfollowed ${targetUserId}`
      );
    if (getClientSockets()[targetUserId])
      getClientSockets()[targetUserId].emit(
        'unfollow-user-receiver',
        `${req.userId} just unfollowed`
      );
    const message = 'unfollowed the target user successfully';
    res.status(200).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
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
    getIo().emit('post-reaction', {
      reaction: savedReaction,
    });

    res.status(201).json({ message: message, reaction: savedReaction });
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.putReaction = async (req, res, next) => {
  const { reactionId, reactionMessage } = req.body;
  try {
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      throw new Error('invalid reaction id');
    }
    reaction.reactionMessage = reactionMessage;
    const updatedReaction = await reaction.save();
    getIo().emit('put-reaction', {
      reaction: updatedReaction,
    });
    const message = 'updated reaction message successfully';
    res.status(200).json({ message: message, reaction: updatedReaction });
    // const anime = await Anime.findById(reaction.animeId.toString())
    // if (!anime) throw new Error('invalid anime id');
    // const user = await User.findById(req.userId)
    // if (!user) throw new Error('no user found');
    // const i = anime.reactionlist.findIndex(each => each.toString() === reactionId)
    // if (i >= 0) anime.reactionlist[i] =
  } catch (err) {
    errorHandler(err, next);
  }
};

exports.deleteReaction = async (req, res, next) => {
  const reactionId = req.body.reactionId;
  try {
    const reaction = await Reaction.findByIdAndDelete(reactionId);
    if (!reaction) throw new Error('failed to fetch reaction with this id');
    const anime = await Anime.findById(reaction.animeId.toString());
    if (!anime) throw new Error('failed to fetch anime with this id');
    const user = await User.findById(req.userId);
    const updatedAnimeReactionlist = anime.reactionlist.filter(
      (each) => each.toString() !== reactionId
    );
    const updatedUserReactionlist = user.reactionlist.filter(
      (each) => each.toString() !== reactionId
    );
    anime.reactionlist = updatedAnimeReactionlist;
    user.reactionlist = updatedUserReactionlist;
    await anime.save();
    await user.save();

    const message = 'deleted reaction successfully';
    res.status(200).json({ message: message });
  } catch (err) {
    errorHandler(err, next);
  }
};
