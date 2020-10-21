require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connceted to Database'))

app.use(express.json())

const routeFor = require('./routes/route')
app.use('/', routeFor)

app.listen(process.env.PORT || 3000)

module.exports = app