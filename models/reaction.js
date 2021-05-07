const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    animeId: {
      type: Schema.Types.ObjectId,
      ref: 'Anime',
    },
    upvote: {
      type: Number,
      default: 0,
    },
    reactionMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reaction', reactionSchema);
