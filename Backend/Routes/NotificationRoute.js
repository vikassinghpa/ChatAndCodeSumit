const express = require('express');
const User = require('../Models/UserModel');
const Notification = require('../Models/Notification');
const router = express.Router();
const {authenticateToken} = require('../middleware');

router.get('/notifications',authenticateToken,async(req,res)=>{
  let userId = req.user.userId;
  try{
   let user = await User.findById(userId);
   let notify = await Notification.find({}).populate({path:'sender',select:'firstName lastName userName'});
   let notifyInfo = await notify.filter(x => x.receiver == userId);
   res.status(200).json(notifyInfo);
  }
  catch(e){
    console.log("error in notification:",e);
    res.status(500).json("Internal Error");
  }
})

router.delete('/notification/:id',authenticateToken,async(req,res)=>{
  let userId = req.user.userId;
  let {id} = req.params;
  try{
  await User.findOneAndUpdate({_id:userId},{$pull:{notification:id}});
  await Notification.findOneAndDelete({_id:id});
  res.status(200).json("Success")
  }
  catch(e){
    console.log("error in delete notification: ",e);
    res.status(500).json("Internal Error");
  }
})

module.exports = router;