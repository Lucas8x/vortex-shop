const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  credits: {
    type: Number,
    required: false,
    default: 1000
  },
  ownedGames: [{
    type: Schema.Types.ObjectId,
    ref: 'Game',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
},
{
  timestamps: true,
})

module.exports = model('User', UserSchema)