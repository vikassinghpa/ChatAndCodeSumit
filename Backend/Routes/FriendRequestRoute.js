const express = require('express');
const User = require('../Models/UserModel');
const router = express.Router();
const {authenticateToken} = require('../middleware');

router.get('/friends',authenticateToken,async(req,res)=>{

})

router.post('/send-request',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {receiveUsername} = req.body;
try{
let senderUser = await User.findById(userId);
if(!senderUser){
  return res.status(404).json("Sender User Not Found");
}
let receiverUser = await User.findOne({userName:receiveUsername});
if(!receiverUser){
  return res.status(404).json("Receiver User Not Found");
}

receiverUser = await User.findByIdAndUpdate(receiverUser._id,{$push:{friendRequest:{from:senderUser._id}}});
await receiverUser.save();
res.status(200).json(receiverUser);

}
catch(e){
  console.log("Failed to send friend request error: ",e);
  res.status(500).json("Internal Error");
}
})

router.post('/accept-request',authenticateToken,async(req,res)=>{

})

router.post('/reject-request',authenticateToken,async(req,res)=>{

})




module.exports = router;