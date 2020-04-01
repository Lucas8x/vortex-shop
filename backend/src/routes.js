const express = require('express');

const routes = express.Router();

const Home = require('./controllers/Home');
const Register = require('./controllers/Register');
const Store = require('./controllers/Store');
const Users = require('./controllers/Users');
const Profile = require('./controllers/Profile');
// const Friend = require('./controllers/Friend');
const Auth = require('./controllers/Authentication');
const Admin = require('./controllers/Admin');

routes.post('/api/cadastro', Register.create);

routes.get('/api/users', Users.index);
routes.post('/api/auth', Auth.validate);

routes.get('/api/store', Store.index);
routes.post('/api/store', Store.purchase);

routes.get('/api/profile/:username', Profile.index);
routes.get('/api/profile/:username/wishlist', Profile.wishlist);

routes.get('/api/admin', Admin.get);
routes.put('/api/admin', Admin.put);
routes.delete('/api/admin', Admin.delete);

routes.get('*', Home.index);

module.exports = routes;
