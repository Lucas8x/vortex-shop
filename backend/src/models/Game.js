const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    steam_id: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    cover: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    }
  }, 
  { timestamps: true, }
)

module.exports = model('Game', GameSchema)