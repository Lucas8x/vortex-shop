const axios = require('axios')
/*const bcrypt = require('bcrypt')
const saltRounds = 10;*/

const User = require('../models/User')

module.exports = {
  async create(req, res) {
    try {
      const {username, password, email} = req.body
      const userExists = await User.findOne({username})

      if(userExists) {
        return res.json({alreadyRegistered: true})
      }

      const response = await axios.get(`https://api.github.com/users/${username}`)
      const {name, avatar_url} = response.data

      /*bcrypt.hash(password, saltRounds, function(err, hash) {
      })*/

      const user = await User.create({
        username,
        //password,
        //email,
        name,
        avatar: avatar_url
      })

      console.log(`Nova conta criada: ${username}`)

      return res.json(user)

    } catch (err) {
      console.log(`Register error: ${err}`)
      return res.sendStatus(500)
    }
  }
}
