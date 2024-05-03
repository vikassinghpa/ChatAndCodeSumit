const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
  receiver:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  sender:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  message:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["addPost","likePost","sendRequest","acceptRequest","rejectRequest"],
    default:"sendRequest"
  }
},{timestamps:true})

const Notification = mongoose.model("Notification",notificationSchema);
module.exports = Notification;