const express = require('express')
const router = express.Router();
const User = require('../Models/UserModel')
const argon2 = require('argon2');

router.post('/register',async (req,res)=>{
  let {firstName,lastName,userName,password,email} = req.body;
  try{
    let Username = await User.find({userName});
  let Email = await User.find({email});
  if(Username){
    res.json({msg:"username already exists"});
  }
  if(Email){
    res.json({msg:"email already exists"})
  }
  let newPassword = await argon2.hash(password);
  password = newPassword;
  let user = await User.create({firstName,lastName,userName,password,email})
  res.json({msg:"success"});
  }
  catch(e){
    console.log("Failed register new user: ",e);
    // res.json({msg:"Failed Register User"});
  }
})

router.post('/login',async (req,res)=>{
  let {userName,password} = req.body;
  try{
    let user = await User.find({userName});
    if(!user){
      return res.json({msg:"username does not exists"})
    }
    let verifyPassword = user.password;
    if(await argon2.verify(verifyPassword,password)){
      res.json({msg:"success"});
    }
  }
  catch(e){
    console.log("Failed to login user: ",e);
    res.json({msg:"Failed Login User"});
  }
})






module.exports = router;