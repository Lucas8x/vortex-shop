const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  password : {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: false
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

  wishList: [{
    type: Schema.Types.ObjectId,
    ref: 'Game',
  }],

  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

}, { timestamps: true,})

module.exports = model('User', UserSchema)