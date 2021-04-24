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
});

module.exports = mongoose.model('Anime', animeSchema);
