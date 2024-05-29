const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const Chat = require('../Models/ChatModel');
const {authenticateToken} = require('../middleware');

router.get('/user/chat',authenticateToken,async(req,res)=>{
  try {
    let userId = req.user.userId;
    let user = await User.findById(userId).populate({
      path:'chats',
      select:'-message',
      populate:{
        path:'source target',
        select:'firstName lastName userName photo'
      }
    });
    let chats = user.chats;
    res.status(200).json(chats);
  } catch (error) {
    console.log("error in fetch all chats: ",error);
    res.status(500).json("internal server error");
  }
})
router.get('/chat',authenticateToken , async(req,res)=>{
  try {
    let {chatId} = req.query;
    let chat = await Chat.findById(chatId).populate({
      path:'message',
      populate:{
        path:'sender',
        select:'firstName lastName userName'
      }
    }).populate({
      path:'target',
      select:'firstName lastName userName'
    })
    res.status(200).json(chat);
  } catch (error) {
    console.log("error in fetch chat: ",error);
    res.status(500).json('internal server error');
  }
})



module.exports = router;