const User = require('../models/User')
const Game = require('../models/Game')

module.exports = {
  async purchase(req, res) {
    const {user, gameId} = req.headers
    const loggedUser = await User.findById(user)
    const targetGame = await Game.findById(gameId)

    if(!targetGame) {
      return res.staus(400).json({error: "Game doesnt exists"})
    }

    loggedUser.ownedGames.push(targetGame._id)
    await loggedUser.save()

    console.log(`${loggedUser} bought ${targetGame.name}`)

    return res.json(loggedUser)
  }
}