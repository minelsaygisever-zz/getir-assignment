require('dotenv').config()

// express framework
const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.json())
const cors = require('cors')
app.use(cors())

// mongoose connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connceted to Database'))

const routeFor = require('./routes/route')
app.use('/', routeFor)

app.listen(process.env.PORT || 3000)

module.exports = app