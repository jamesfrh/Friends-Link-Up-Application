/*const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb+srv://jamesfrh:jamesfrh@friendcluster.8g5vo.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(() => console.log('mongoose is running'))

const User = require('./models/users')

app.use(bodyParser.json())

//link up with friends
app.post('/api/link', (req, res) => {
    console.log(req.body);
})

//make a new post to friends
app.post('/api/newPost', (req, res) => {
    console.log(req.body);
})

app.listen(1234, ()=> console.log('listen at 1234'))*/