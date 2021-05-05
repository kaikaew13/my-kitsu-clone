const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    animelist: {
      type: [
        {
          animeId: {
            type: Schema.Types.ObjectId,
            ref: 'Anime',
          },
          status: {
            type: String,
            enum: [
              'Currently Watching',
              'Completed',
              'Want to Watch',
              'Dropped',
              'On Hold',
            ],
            required: true,
          },
        },
      ],
      default: [],
    },
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
