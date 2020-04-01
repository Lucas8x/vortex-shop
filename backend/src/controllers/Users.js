const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const registeredUsers = await User.find({}, '-_id name username avatar');
      return res.json(registeredUsers);
    } catch (err) {
      console.log(`Error to list users ${err}`);
      return res.sendStatus(500);
    }
  },
};
