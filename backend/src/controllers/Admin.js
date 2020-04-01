const axios = require('axios');
const User = require('../models/User');
const Game = require('../models/Game');

const steamApi = 'https://store.steampowered.com/api/appdetails/?appids=';

module.exports = {
  async get(req, res) {
    try {
      const { adminKey } = req.body;

      if (adminKey === process.env.ADMIN_KEY) {
        // só para teste
        return res.sendStatus(200);
      }

      return res.sendStatus(401);
    } catch (err) {
      console.log(`[GET] Admin Error ${err}`);
      return res.sendStatus(404);
    }
  },

  async put(req, res) {
    try {
      const { action, adminKey } = req.body;

      if (adminKey === process.env.ADMIN_KEY) {
        // só pra teste
        if (action === 'addGame') {
          const { gamesID } = req.body;

          gamesID.forEach(async (gameId) => {
            const gameExists = await Game.findOne({ steam_id: gameId });

            if (!gameExists) {
              const steamResponse = await axios.get(`${steamApi}${gameId}`);
              const { name, headerImage } = steamResponse.data[gameId].data;
              const { initial } = steamResponse.data[
                gameId
              ].data.price_overview;

              await Game.create({
                steam_id: gameId,
                name,
                cover: headerImage,
                price: initial,
              });
              console.log(
                `[ADMIN] Adicionado Jogo > ID: ${gameId} Nome: ${name} Preço: ${
                  initial / 100
                }`
              );
            }
          });
          return res.sendStatus(200);
        }
      } else {
        return res.sendStatus(401);
      }
    } catch (err) {
      console.log(`[POST] Admin Error ${err}`);
      return res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      const { action, adminKey } = req.body;

      if (adminKey === process.env.ADMIN_KEY) {
        if (action === 'delGame') {
          const { gameId } = req.body;
          const targetGame = await Game.findOne({ steam_id: gameId });

          if (!targetGame) {
            return res.json({ error: 'Game doesnt exists' });
          }

          await Game.deleteOne({ steam_id: gameId });

          console.log(
            `[ADMIN] Deletado Jogo > ID: ${gameId} Nome: ${targetGame.name}`
          );
          return res.sendStatus(200);
        }

        if (action === 'delUser') {
          const { username } = req.body;
          const targetUser = await User.findOne({ username });

          if (!targetUser) {
            return res.json({ error: 'User doesnt exists' });
          }

          await User.deleteOne({ username });

          console.log(`[ADMIN] Deletado Usuario: ${username}`);
          return res.sendStatus(200);
        }
      }
    } catch (err) {
      console.log(`[POST] Admin Error ${err}`);
      return res.sendStatus(500);
    }
  },
};
