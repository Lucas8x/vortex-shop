const express = require('express')
const routes = express.Router()

const Login = require('./controllers/Login')
const Store = require('./controllers/Store')
const Users = require('./controllers/Users')
const Profile = require('./controllers/Profile')
const Admin = require('./controllers/Admin')

routes.get('/', Login.index)
routes.post('/', Login.create)

routes.get('/users', Users.index)

routes.get('/store', Store.index)
routes.post('/store', Store.purchase)

routes.get('/profile', Profile.index)
routes.get('/profile', Profile.post)

routes.get('/admin', Admin.get)
routes.post('/admin', Admin.post)

module.exports = routes
