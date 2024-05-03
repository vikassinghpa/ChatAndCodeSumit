const express = require('express');
const User = require('../Models/UserModel');
const Post = require('../Models/PostModel');
const Notification = require('../Models/Notification');
const { authenticateToken ,isPostOwner} = require('../middleware');
const router = express.Router();

router.get('/my-posts',authenticateToken,async(req,res)=>{
  let userId = req.user.userId;
  try{
   let post = await Post.find({userId : userId});
   res.status(200).json(post);
  }
  catch(e){
    console.log("Failed to fetch my Posts error: ",e);
    res.status(500).json("Internal Error");
  }
})

router.post('/add-post',authenticateToken,async(req,res)=>{
  let userId = req.user.userId;
  let {title,upload,desc} = req.body;
  try{
    let user = await User.findById(userId);
    if(!user){
      return res.status(404).json("Not Found");
    }
   let newPost = new Post({title,upload,desc,userId:userId})
   await newPost.save();
   await user.post.push(newPost);
   await user.save();
   let friends = user.friend;
   console.log("friends: ",friends);
   friends.forEach(async friend => {
    console.log("friend: ",friend);
    var msg = "New Post added by the ";
    msg += user.firstName;
    let notification = new Notification({
      receiver : friend._id,
      sender : user._id,
      message : msg,
      status :"addPost"
    })
    console.log("notification: ",notification);
    await notification.save();
    await User.findByIdAndUpdate(friend._id,{$push:{notification:notification._id}});
   });
   res.json("Success");
  }
  catch(e){
    console.log("failed add new post error: ",e);
    res.status(500).json("Internal Error");
  }
})

router.delete('/delete-post/:id',authenticateToken,isPostOwner, async(req,res)=>{
  let userId = req.user.userId;
  let {id} = req.params;
try{
let user = await User.findById(userId);
if(!user){
  return res.status(200).json("Not Found User")
}
let post = await Post.findById(id);
if(!post){
  return res.status(200).json("Not Found Post");
}
user = await User.findByIdAndUpdate(userId,{$pull:{post:id}});
await Post.findByIdAndDelete(id);
res.status(200).json("Success");
}
catch(e){
  console.log("failed delete post error: ",e);
  res.status(500).json("Internal Error");
}
})






module.exports = router;