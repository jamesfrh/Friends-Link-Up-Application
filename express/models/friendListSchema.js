const mongoose = require('mongoose')

const FriendListSchema = new mongoose.Schema({
    myEmail: {
        type: String,
        required: true
    },
    friendEmail: {
        type: String,
        required: true
    },
    subscribed: Boolean,
    blocked: Boolean
})

module.exports = mongoose.model('relationships', FriendListSchema)