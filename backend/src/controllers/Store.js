const axios = require('axios')
const User = require('../models/User')
const Game = require('../models/Game')

module.exports = {
  async index(req, res) {
    try {
      const storeGames = await Game.find({}, '-_id steam_id name cover price')
      return res.json(storeGames)
    } catch(e) {
      console.log(`Store Index error: ${e}`)
      return res.sendStatus(404)
    }
  },

  async purchase(req, res) {
    try {
      const {username, gameID} = req.body
      const loggedUser = await User.findOne({username})
      const targetGame = await Game.findOne({steam_id: gameID})

      if(!targetGame) {
        return res.sendStatus(400).json({error: "Game doesnt exists"})
      } 

      if(!loggedUser.ownedGames.includes(targetGame._id)) {
        loggedUser.ownedGames.push(targetGame._id)
        await loggedUser.save()
        console.log(`${loggedUser.username} bought ${targetGame.name}`)
      }
      return res.json(loggedUser)

    } catch(e) {
      console.log(`Purchase Error: ${e}`)
      return res.json({"purchase": false})
    }
  }
}