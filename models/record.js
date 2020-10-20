const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalCount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Record', schema)