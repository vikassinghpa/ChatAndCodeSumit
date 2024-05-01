const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Post = require('./Models/PostModel');

const authenticateToken = (req,res,next)=>{
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];
 if(token == null){
  return res.status(401).json("token not exist");
 }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err){
      return res.status(403).json("failed authentication");
    }
    req.user = user;
    next();
  })
}

const isPostOwner = async(req,res,next)=>{
  let {id} = req.params;
  const post = await Post.findById(id);
  if(!post){
    return res.status(404).json("Post Not Found");
  }
  if(!post.userId.equals(req.user.userId)){
    return res.status(401).json("Invalid Access");
  }
  next();
}

module.exports = {authenticateToken , isPostOwner};