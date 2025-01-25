require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const opportRoutes = require('./routes/opportunities.js')

const app = express()

app.use(
    cors({
      origin: true, // Allowed origins
      methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
      credentials: true,
    })
  )

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/opportunities', opportRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
