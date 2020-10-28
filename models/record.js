const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    counts: {
        type: [Number]
    },
    createdAt: {
        type: Date
    },
    key: {
        type: String
    },
    value: {
        type: String
    },
})

module.exports = mongoose.model('Record', schema)