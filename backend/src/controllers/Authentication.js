const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  async validate(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }, '-_id username password');
      const validPassword = bcrypt.compareSync(password, user.password);
      if (user && validPassword) {
        const token = jwt.sign(
          {
            username,
          },
          process.env.SECRET_KEY
        );

        return res.json({
          authenticated: true,
          token,
          username,
        });
      }

      return res.json({ authenticated: false });
    } catch (err) {
      console.log(`Auth Failed: ${err}`);
      return res.sendStatus(500);
    }
  },
};
