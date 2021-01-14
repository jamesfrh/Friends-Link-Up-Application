const mongoose = require('mongoose')

const newPostSchema = new mongoose.Schema({
    myEmail: {
        type: String,
        required: true
    },
    friendEmail: {
        type: String,
        required: true
    },
    newPost: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('newpost', newPostSchema)