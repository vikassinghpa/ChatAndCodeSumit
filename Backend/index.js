const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Cors = require('cors');
const UserRoute = require('./Routes/UserRoute');
const ProfileRoute = require('./Routes/ProfileRoute');
const PostRoute = require('./Routes/PostRoute');
const FriendRequestRoute = require('./Routes/FriendRequestRoute');
const NotificationRoute = require('./Routes/NotificationRoute');

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("DB connected")
})
.catch((e)=>{
  console.log("Failed DB Connection: ",e)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(Cors({
  origin:[process.env.ALLOWED_URL]
}))
app.get('/',(req,res)=>{
  res.send("hello world")
})


app.use('/auth',UserRoute)
app.use('/user',ProfileRoute)
app.use('/user',PostRoute);
app.use('/user',FriendRequestRoute);
app.use('/user',NotificationRoute);

app.listen(process.env.PORT,()=>{
  console.log("server connected at port.")
})