const path = require('path')

module.exports = {
  async index(req, res) {
    return res.sendFile(path.resolve(__dirname, '../../../frontend/build', 'index.html'))
  }
}