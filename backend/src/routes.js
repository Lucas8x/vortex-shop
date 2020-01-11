const express = require('express')
const routes = express.Router()

const Home = require('./controllers/Home')
const Register = require('./controllers/Register')
const Store = require('./controllers/Store')
const Users = require('./controllers/Users')
const Profile = require('./controllers/Profile')
//const Friend = require('./controllers/Friend')
const Admin = require('./controllers/Admin')

routes.get('/', Home.index)

routes.get('/cadastro', Register.create)
routes.post('/cadastro', Register.create)

routes.get('/users', Users.index)

routes.get('/store', Store.index)
routes.post('/store', Store.purchase)

routes.get('/profile/:username', Profile.index)
routes.get('/profile/:username/wishlist', Profile.wishlist)

routes.get('/admin', Admin.get)
routes.put('/admin', Admin.put)
routes.delete('/admin', Admin.delete)

module.exports = routes
