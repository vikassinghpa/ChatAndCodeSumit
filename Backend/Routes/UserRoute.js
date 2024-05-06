const express = require('express')
const router = express.Router();
const User = require('../Models/UserModel')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')
const path = require('path');
const { authenticateToken } = require('../middleware');
const dotenv = require('dotenv').config({path: path.resolve(__dirname,'../.env')})

router.post('/register',async (req,res)=>{
  let {firstName,lastName,userName,password,email} = req.body;
  try{
    let Username = await User.findOne({userName});
  let Email = await User.findOne({email});
  if(Username){
    return res.json("username exist");
  }
  else if(Email){
    return res.json("email exist")
  }
  let newPassword = await argon2.hash(password);
  password = newPassword;
  let user = new User({firstName,lastName,userName,password,email})
  await user.save();
  res.json('success');
  }
  catch(e){
    console.log("Failed register new user: ",e);
    res.json("Failed Register");
  }
})

router.post('/login',async (req,res)=>{
  let {email,password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.json("username not exist")
    }
    let verifyPassword = user.password;
    if(await argon2.verify(verifyPassword,password)){
      const payload = {
        userId: user._id,
        username:user.userName,
      }
      const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3h'});
      res.json(token)
    }else{
      res.json("Incorrect Password");
    }
  }
  catch(e){
    console.log("Failed to login user: ",e);
    res.json("Failed Login User");
  }
})






module.exports = router;