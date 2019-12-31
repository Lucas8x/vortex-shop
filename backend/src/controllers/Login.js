const axios = require('axios')
const Store = require('../controllers/Store')
const User = require('../models/User')

module.exports = {
  async index(req, res) {
    try {
      const {username} = req.body
      if(username) {
        const loggedUser = await User.findOne({username})
        return res.redirect(301, '/store')
      } else {
        return res.send('não esta logado')
      }
      
    } catch(e) {
      return res.sendStatus(404)
    }
  },

  async create(req, res) {
    try {
      const {username} = req.body
      const userExists = await User.findOne({username})

      if(userExists) {
        //return res.send(`Conta já registrada`)
        return res.redirect('/store')
      }

      const response = await axios.get(`https://api.github.com/users/${username}`)
      const {name, avatar_url} = response.data

      const user = await User.create({
        name,
        username,
        avatar: avatar_url
      })
      console.log(`Nova conta criada: ${username}`)

      return res.json(user)

    } catch(e) {
      //console.log(`Error in login.js create ${e}`)
      res.sendStatus(404)
      //return res.status(404).send('fail')
    }
  }
}
