const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
    myEmail: {
        type: String,
        required: true
    },
    friendEmail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('emailSchema', emailSchema)