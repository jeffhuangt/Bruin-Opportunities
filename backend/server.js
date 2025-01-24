require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const opportRoutes = require('./routes/opportunities.js')

const app = express()

app.use(
    cors({
      origin: ['http://localhost:5173', 'https://gleeful-buttercream-5cd100.netlify.app'], // Allowed origins
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
