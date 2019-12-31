const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
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

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listen port: ${process.env.PORT || 3001}`)
})
