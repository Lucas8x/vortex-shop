const path = require('path')

module.exports = {
  async index(req, res) {
    const indexPath = '../../../frontend/build'
    return res.sendFile(path.resolve(__dirname, indexPath, 'index.html'))
  }
}