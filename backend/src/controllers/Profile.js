const User = require('../models/User');
const Game = require('../models/Game');

module.exports = {
  async index(req, res) {
    try {
      const { username } = req.params;
      const targetProfile = await User.findOne(
        { username },
        '-_id name username avatar ownedGames friends'
      );
      return res.json(targetProfile);
    } catch (err) {
      console.log(`Error to show profile ${err}`);
      return res.sendStatus(500);
    }
  },

  async wishlist(req, res) {
    try {
      const { username } = req.params;
      const targetProfile = await User.findOne(
        { username },
        '-_id username avatar wishList'
      );
      return res.json(targetProfile);
    } catch (err) {
      console.log(`Failed to get wishlist ${err}`);
      return res.sendStatus(500);
    }
  },
};
