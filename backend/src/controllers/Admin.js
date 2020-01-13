const axios = require('axios')
const User = require('../models/User')
const Game = require('../models/Game')

const steam_api = 'https://store.steampowered.com/api/appdetails/?appids='

module.exports = {
  async get(req, res) {
    try {
      const {admin_key} = req.body

      if(admin_key ===  process.env.ADMIN_KEY) { // só para teste
        return res.sendStatus(200)
      } else {
        return res.sendStatus(401)
      }
    } catch (err) {
      console.log(`[GET] Admin Error ${err}`)
      return res.sendStatus(404)
    }
  },

  async put(req, res) {
    try {
      const {action, admin_key} = req.body

      if(admin_key ===  process.env.ADMIN_KEY) { // só pra teste
        if(action === 'addGame') {
          const {gamesID} = req.body

          gamesID.forEach(async (game_id) => {
            const gameExists = await Game.findOne({steam_id: game_id})

            if(!gameExists) {
              const steam_response = await axios.get(`${steam_api}${game_id}`)
              const {name, header_image} = steam_response.data[game_id].data
              const {initial} = steam_response.data[game_id]["data"]["price_overview"]

              await Game.create({
                steam_id: game_id,
                name,
                cover: header_image,
                price: initial
              })
              console.log(`[ADMIN] Adicionado Jogo > ID: ${game_id} Nome: ${name} Preço: ${initial/100}`)
            }
          })
          return res.sendStatus(200)
        }
      } else {
        return res.sendStatus(401)
      }

    } catch (err) {
      console.log(`[POST] Admin Error ${err}`)
      return res.sendStatus(500)
    }
  },

  async delete(req, res) {
    try {
      const {action, admin_key} = req.body

      if(admin_key ===  process.env.ADMIN_KEY) {
        if(action === 'delGame') {
          const {game_id} = req.body
          const targetGame = await Game.findOne({steam_id: game_id})

          if(!targetGame) {
            return res.json({error: "Game doesnt exists"})
          }

          await Game.deleteOne({steam_id: game_id})

          console.log(`[ADMIN] Deletado Jogo > ID: ${game_id} Nome: ${targetGame.name}`)
          return res.sendStatus(200)
        }
        else if(action === 'delUser') {
          const {username} = req.body
          const targetUser = await User.findOne({username})

          if(!targetUser) {
            return res.json({error: "User doesnt exists"})
          }

          await User.deleteOne({username})

          console.log(`[ADMIN] Deletado Usuario: ${username}`)
          return res.sendStatus(200)
        }
      }
    } catch(err) {
      console.log(`[POST] Admin Error ${err}`)
      return res.sendStatus(500)
    }
  }
}
