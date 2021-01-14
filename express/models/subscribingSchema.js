const mongoose = require('mongoose')

const subscribingSchema = new mongoose.Schema({
    myEmail: {
        type: int,
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