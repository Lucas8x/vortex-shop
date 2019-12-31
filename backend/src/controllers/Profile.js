const User = require('../models/User')
const Game = require('../models/Game')

module.exports = {
  async index(req, res) {
    try {
      return res.send('profile index')
    } catch (err) {
      console.log(`Error to show profile ${e}`)
      return res.sendStatus(404)
    }
  },

  async post(req, res) {
    try {
      return res.send('profile post')
    } catch (err) {
      return res.sendStatus(404)
    }
  }
}