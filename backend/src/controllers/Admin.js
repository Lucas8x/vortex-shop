const axios = require('axios')
const User = require('../models/User')
const Game = require('../models/Game')

const steam_api = `https://store.steampowered.com/api/appdetails/?appids=`

module.exports = {
  async get(req, res) {
    try {
      const {admin_key} = req.body
    
      if(admin_key ===  process.env.SECRET_KEY) { // só para teste
        res.sendStatus(200)
      } else {
        res.sendStatus(401)
      }
    } catch (e) {
      console.log(`[GET] Admin Error ${e}`)
      res.sendStatus(404)
    }
  },

  async post(req, res) {
    try {
      const {action, admin_key} = req.body

      if(admin_key ===  process.env.SECRET_KEY) { // só pra teste
        if(action === 'addGame') {
          const {gamesID} = req.body
          
          gamesID.forEach(async (Id) => {
            const gameExists = await Game.findOne({steam_id: Id})
            
            if(!gameExists) {
              const steam_response = await axios.get(`${steam_api}${Id}`)
              const {name, header_image} = steam_response.data[Id].data
              const {initial} = steam_response.data[Id]["data"]["price_overview"]
              
              const game = await Game.create({
                steam_id: Id,
                name,
                cover: header_image,
                price: initial
              })
              console.log(`[ADMIN] Adicionado Jogo > ID: ${Id} Nome: ${name} Preço: ${initial/100}`)
            }
          });
          return res.sendStatus(200)
        } 
        
        else if(action === 'delGame') {
          const {gameID} = req.body
          const targetGame = await Game.findOne({steam_id: gameID})
  
          if(!targetGame) {
            res.send(`Jogo não existe`)
          }
  
          await Game.deleteOne({steam_id: gameID})
          
          console.log(`[ADMIN] Deletado Jogo > ID: ${gameID} Nome: ${targetGame.name}`)
          return res.send("Jogo Removido.")
        }
      } else {
        return res.sendStatus(401)
      }
    
    } catch (e) {
      console.log(`[POST] Admin Error ${e}`)
      return res.sendStatus(404)
    }
  }
}
