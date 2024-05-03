const mongoose= require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiver :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  message:{
    type:String,
    required:true,
    trim:true,
  },
  status:{
    enum:['addPost','likePost','rejectRequest','acceptRequest','sendRequest'],
    default:'sendRequest'
  }
},{timestamps:true});

const Notification = mongoose.model("Notification",notificationSchema);
module.exports = Notification;