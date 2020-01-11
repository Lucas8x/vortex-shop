const User = require('../models/User')
const Game = require('../models/Game')

module.exports = {
  async index(req, res) {
    try {
      const storeGames = await Game.find({}, '-_id steam_id name cover price')
      return res.json(storeGames)
    } catch (err) {
      console.log(`Store Index error: ${err}`)
      return res.sendStatus(404)
    }
  },

  async purchase(req, res) {
    try {
      const {username, gameID} = req.body
      const targetGame = await Game.findOne({steam_id: gameID})

      if(!targetGame) {
        return res.sendStatus(400).json({error: "Game doesnt exists"})
      } 

      const loggedUser = await User.findOne({username})

      if(!loggedUser.ownedGames.includes(targetGame._id)) {
        loggedUser.ownedGames.push(targetGame._id)
        await loggedUser.save()
        console.log(`${loggedUser.username} bought ${targetGame.name}`)
        return res.json({"purchased": true})
      } 
      else {
        console.log(`${loggedUser.username} tried buy ${targetGame.name}`)
        return res.json({"alreadyOwn": true})
      }

    } catch (err) {
      console.log(`Purchase Error: ${err}`)
      return res.json({"purchased": false})
    }
  }
}