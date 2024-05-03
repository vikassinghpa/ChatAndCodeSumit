const express = require('express');
const User = require('../Models/UserModel');
const router = express.Router();
const Notification = require('../Models/Notification');
const {authenticateToken} = require('../middleware');

router.get('/friends',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
try{
  let user = await User.findById(userId);
  let allUser = await User.find({});
  let suggested = await allUser.filter(x => x._id != userId);
  // await suggested.save();
  res.status(200).json(suggested);
}
catch(e){
  console.log("failed to fetch friends list error: ",e);
  res.status(500).json("Internal Error");
}
})

router.post('/send-request',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {receiverId} = req.body;
try{
let sender = await User.findById(userId);
if(!sender){
  return res.status(404).json("Sender User Not Found");
}
let receiver = await User.findById(receiverId)
if(!receiver){
  return res.status(404).json("Receiver User Not Found");
}
let existRequest = await receiver.friendRequest.find(req => req.from == userId && req.status == 'pending');
if(existRequest){
  return res.status(200).json("Already Sent");
}
var msg = "Frined Request sent by the ";
msg = msg + sender.firstName;
await User.findByIdAndUpdate(receiverId,{$push:{friendRequest:{from:userId}}});
let notification = new Notification({
  receiver:receiverId,
  sender:userId,
  message: msg,
  status:"sendRequest"
})
await notification.save();
await User.findByIdAndUpdate(receiverId,{$push:{notification:notification._id}});
res.status(200).json("Success");
}
catch(e){
  console.log("Failed to send friend request error: ",e);
  res.status(500).json("Internal Error");
}
})

router.post('/accept-request',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {receiverId} = req.body;
try{
  let sender = await User.findById(userId);
  let receiver = await User.findById(receiverId);
  if(!receiver){
    return res.status(404).json("Receiver Not Found");
  }
  await sender.friend.push(receiverId);
  await sender.save();
  await receiver.friend.push(userId);
  await User.findByIdAndUpdate(userId,{$pull:{friendRequest:{from:receiverId}}});
  await receiver.save();
  res.status(200).json("Success");
}
catch(e){
  console.log("Failed to accept friend request error: ",e);
  res.status(500).json("Internal Error");
}
})

router.post('/reject-request',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {receiverId} = req.body;
try{
  let sender = await User.findById(userId);
  let receiver = await User.findById(receiverId);
  if(!receiver){
    return res.status(404).json("Receiver Not Found");
  }
  sender = await User.findByIdAndUpdate(userId,{$pull:{friendRequest:{from:receiverId}}});
  await sender.save();
  res.status(200).json("Success");
}
catch(e){
  console.log("Failed to reject friend request error: ",e);
  res.status(500).json("Internal Error");
}
})




module.exports = router;