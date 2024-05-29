const {Server} = require('socket.io');
const Chat = require('../Models/ChatModel');
const {authenticateSocket} = require('../middleware');
const cors = require('cors');

function InitializeSocket(server){
  const io = new Server(server, {
    cors: ({
      origin: process.env.ALLOWED_URL,
      methods: ["GET", "POST"],
      credentials: true
    })
  });
  
  // io.use(authenticateSocket);
  
  io.on("connection",(socket)=>{
    console.log("socket connection",socket.id);

    socket.on('joinRoom',(room)=>{
      console.log("chatId: ",room);
      socket.join(room);
      socket.room = room;
    })

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      delete socket.room;
    });

    socket.on('message',async(msg)=>{
      try {
        let {sender , chatId , message} = msg;
        let chat = await Chat.findById(chatId);
        if(!chat){
          return;
        }
        let newMessage = {sender:sender,content:message};
        chat.message.push(newMessage);
        await chat.save();
        console.log(`chatId sender: ${chatId} and message Content: ${message} on socketId ${socket.id}`);
        let msgTime = newMessage.createdAt;
        console.log(msgTime);
        const obj = {message,sender,msgTime}
        if(socket.room){
          io.to(socket.room).emit('message',obj);
        }
      } catch (error) {
        console.error('error in send message: ',error);
      }
      })
  })
}


module.exports = {InitializeSocket};