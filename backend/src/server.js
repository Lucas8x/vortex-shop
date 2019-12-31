const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(express.static(path.resolve(__dirname, '../../frontend/build')))

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listen port: ${process.env.PORT || 3001}`)
})
