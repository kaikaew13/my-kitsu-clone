const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  genre: {
    type: [
      {
        type: String,
        enum: [
          'comedy',
          'romance',
          'action',
          'slice of life',
          'horror',
          'fantasy',
          'shounen',
          'historical',
        ],
        required: true,
      },
    ],
    required: true,
  },
  status: {
    type: String,
    enum: [
      'trending this week',
      'top airing anime',
      'top upcoming anime',
      'highest rated anime',
      'most popular anime',
      'none',
    ],
    default: 'none',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  reactionlist: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('Anime', animeSchema);
