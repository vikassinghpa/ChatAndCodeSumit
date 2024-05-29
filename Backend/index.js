const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {createServer} = require('http');
const {Server} = require('socket.io');
const dotenv = require('dotenv').config();
const cors = require('cors');
const UserRoute = require('./Routes/UserRoute');
const ProfileRoute = require('./Routes/ProfileRoute');
const PostRoute = require('./Routes/PostRoute');
const FriendRequestRoute = require('./Routes/FriendRequestRoute');
const NotificationRoute = require('./Routes/NotificationRoute');
const ChatRoute = require('./Routes/ChatRoute');
const {InitializeSocket} = require('./Routes/SocketHandler');
const server = createServer(app);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("DB connected")
})
.catch((e)=>{
  console.log("Failed DB Connection: ",e)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:[process.env.ALLOWED_URL]
}))

app.get('/',(req,res)=>{
  console.log(process.env.ALLOWED_URL)
  res.send("hello world")
})

app.use('/auth',UserRoute)
app.use('/user',ProfileRoute)
app.use('/user',PostRoute);
app.use('/user',FriendRequestRoute);
app.use('/user',NotificationRoute);
app.use(ChatRoute);
InitializeSocket(server);



server.listen(process.env.PORT,()=>{
  console.log("server connected at port.")
})