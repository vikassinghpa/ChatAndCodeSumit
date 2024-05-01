const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const Education = require('../Models/EducationModel');
const {authenticateToken} = require('../middleware');

router.get('/profile',authenticateToken,async(req,res)=>{
  let userId = req.user.userId;
  try{
    let user = await User.findById(userId).populate('education');
    if(!user){
      return res.status(404).json("Not Found");
    }
    res.status(200).json(user);
  }
  catch(e){
    console.log("failed to fetch profile error: ",e);
    res.status(500).json("Internal Error");
  }
  
})

router.put('/update-profile',authenticateToken,async (req,res)=>{
let userId = req.user.userId;
let {firstName,lastName,email,phone} = req.body;
try{
  let user = await User.findById(userId);
  if(!user){
    return res.status(404).json("Not Found");
  }
  user = await User.findByIdAndUpdate(userId,{firstName,lastName,email,phone});
  await user.save();
  res.status(200).json(user);
}
catch(e){
  console.log("Failed to update profile error: ",e);
  res.status(500).json("Internal Error");
}

})

router.post('/add-education',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {school, college} = req.body;
try{
 let user = await User.findById(userId);
 if(!user){
  return res.status(404).json("Not Found");
 }
 let education = new Education({school , college});
 await education.save();

 if(user.education){
  await Education.findByIdAndDelete(user.education);
 }

 user.education = education._id;
 await user.save();
 res.status(201).json("Success");
}
catch(e){
  console.log("failed to add education error: ",e);
  res.status(500).json("Internal Error");
}
})

router.put('/update-education',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
let {school,college} = req.body;
try{
let user = await User.findById(userId);
if(!user){
  return res.status(404).json("Not Found User");
}
let education = await Education.findById(user.education);
if(!education){
  return res.status(404).json("Not Found Education");
}
 education = await Education.findByIdAndUpdate(user.education,{school,college});
 await education.save();
 await user.save();
 res.status(200).json("Success");
}
catch(e){
  console.log("failed to update education error: ",e);
  res.status(500).json("Internal Error");
}
})

router.delete('/delete-education',authenticateToken,async(req,res)=>{
let userId = req.user.userId;
try{
let user = await User.findById(userId);
if(user.education){
  await Education.findByIdAndDelete(user.education);
}
user.education = null;
await user.save();
res.status(200).json(user);
}
catch(e){
  console.log("failed to delete education error: ",e);
  res.status(500).json("Internal Error");
}
})


module.exports = router;