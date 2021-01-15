const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
//require('dotenv/config');
const FriendListSchema = require('./models/friendListSchema');
const newPostSchema = require('./models/newPostSchema');
const emailSchema = require('./models/emailSchema');


app.use(bodyParser.json());

//connect to DB
//mongoose.Promise = Promise
mongoose.connect('mongodb+srv://jamesfrh:jamesfrh@friendcluster.8g5vo.mongodb.net/FriendAppDB?retryWrites=true&w=majority', {useNewUrlParser: true }, () =>
    console.log('connected to DB')
);



//link up with friends
app.post('/api/link', async(req, res) => {
    try{
        const isExist = await FriendListSchema.exists({$and:[{myEmail:req.body.myEmail},{friendEmail:req.body.friendEmail}]})
        if(isExist){
            res.json({message: "Already linked up with friend!"});
        }
        else{
            const relationship = new FriendListSchema({
                myEmail: req.body.myEmail,
                friendEmail: req.body.friendEmail,
                subscribed: false,
                blocked: false
            });
        
            relationship.save()
            .then(data => {
                res.json({message: "Successfully linked up"});
            })
            .catch(error => {
                res.json({message: "error"});
            })

        }

    }
    catch(err){
        res.json({message: err})
    }

})

//make a new post to friends
app.post('/api/newPost', async(req, res) => {

    const postMyEmail = req.body.myEmail
    const postFriendEmail = req.body.friendEmail

    try{
        const getAllfriends = await FriendListSchema.find({$and:[{myEmail:postMyEmail},{friendEmail:postFriendEmail}]})
        //check if the 2 emails are linked up   
        if((getAllfriends === undefined || getAllfriends.length == 0)){
            res.json({message: "Please Link up before sending a post!"});
        }
        const isSubscribed =  await FriendListSchema.findOne(
            {$and:[{myEmail:postMyEmail},{friendEmail:postFriendEmail}]}).select('subscribed -_id')
        console.log(isSubscribed.subscribed)

        const isBlocked =  await FriendListSchema.findOne(
            {$and:[{myEmail:postMyEmail},{friendEmail:postFriendEmail}]}).select('blocked -_id')
        console.log(isBlocked.blocked)

        if(!isSubscribed.subscribed){
            
            res.json({message: "Unable to send post as friend is not subscribed"})
        }
        //check if myEmail blocked friendEmail
        if(isBlocked.blocked){
            res.json({message: "Unable to send post as friend is blocked"})
        } 
        //if no issue, save post in DB
        else{
            const newPost = new newPostSchema({
            myEmail: req.body.myEmail,
            friendEmail: req.body.friendEmail,
            newPost: req.body.newPost
            });
            newPost.save()
            res.json({message: "Success!"});
    }
    }
    catch(err){
        res.json({message: err})
    }
})

app.get('/api/getFriendList/:email', async (req, res) => {
    const emailEntered = req.params.email

    const friendList = await (FriendListSchema.find({myEmail:emailEntered}))
    //.map(x => x.friendEmail))
    //.select('friendEmail -_id'))

    console.log(friendList)
    res.json(friendList)

})
app.get('/api/CommonFriends/:myEmail/:friendEmail', async (req, res) => {
    const myMail = req.params.myEmail
    const friendEmail = req.params.friendEmail
    //get my friend listt
    const myFriends = await(FriendListSchema.find({myEmail:myMail}).select('friendEmail -_id'))
    //get  his friend listt
    const hisFriends = await(FriendListSchema.find({myEmail:friendEmail}).select('friendEmail -_id'))
    //compare and get common friends
    const result = myFriends.filter(x => hisFriends.some(({friendEmail}) => x.friendEmail === friendEmail));

    res.json(result)

})

app.get('/api/ConnectedFriends/:myEmail', async (req, res) => {
    try{
        const connectMyEmail = req.params.myEmail
        const ConnectedFriends = await(FriendListSchema.find(
            {$and:[{myEmail:connectMyEmail},{subscribed:true},{blocked:false}]})
            .select('friendEmail -_id'))
        console.log(ConnectedFriends)
    
        res.json(ConnectedFriends)

    }
    catch{
        res.json({message: err})
    }


})

app.patch('/api/subscribing', async(req, res) => {
    const subscriberList = req.body.subscriberList
    const myEmail = req.body.myEmail
    try{
        for(const toSubscribe in subscriberList){
            const updated = await FriendListSchema.updateOne(
                    {$and:[{myEmail:myEmail},{friendEmail:subscriberList[toSubscribe]}]}, 
                    {$set: {subscribed: true}})
            console.log(updated)
        }
        res.json({message: "Friend successful subscribed"})
    }
    catch{
        res.json({message: err})
    }
})
app.patch('/api/unsubscribing', async(req, res) => {
    const subscriberList = req.body.subscriberList
    const myEmail = req.body.myEmail
    try{
        for(const toSubscribe in subscriberList){
            const updated = await FriendListSchema.updateOne(
                    {$and:[{myEmail:myEmail},{friendEmail:subscriberList[toSubscribe]}]}, 
                    {$set: {subscribed: false}})
            console.log(updated)
        }
        res.json({message: "Friend successful unsubscribed"})
    }
    catch{
        res.json({message: err})
    }
})

app.patch('/api/blocking', async(req, res) => {
    const blockingList = req.body.subscriberList
    const myEmail = req.body.myEmail
    try{
        for(const toBlock in blockingList){
            const booleanValue = await (FriendListSchema.findOne(
                {$and:[{myEmail:myEmail},{friendEmail:blockingList[toBlock]}]}).select('blocked -_id'))
            //console.log(booleanValue)

            const updated = await FriendListSchema.updateOne(
                {$and:[{myEmail:myEmail},{friendEmail:blockingList[toBlock]}]}, 
                {$set: {blocked: true}})
            //console.log(updated)
        }
        res.json({message: "Friends successful blocked"})
    }
    catch(err){
        res.json({message: err})
    }
})

app.patch('/api/unblocking', async(req, res) => {
    const blockingList = req.body.subscriberList
    const myEmail = req.body.myEmail
    try{
        for(const toBlock in blockingList){

            const updated = await FriendListSchema.updateOne(
                {$and:[{myEmail:myEmail},{friendEmail:blockingList[toBlock]}]}, 
                {$set: {blocked: false}})
            //console.log(updated)
        }
        res.json({message: "Friends successful unblocked"})
    }
    catch(err){
        res.json({message: err})
    }
})

app.listen(1234, ()=> console.log('listen at 1234'))