const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
isGroupChat:{
type:Boolean,
default:false,
},
groupName:{
  type:String,
  trim:true,
},
source:{
  type:mongoose.Types.ObjectId,
  ref:"User",
  required:true
},
target:[{
  type:mongoose.Types.ObjectId,
  ref:"User",
  required:true
}],
message:[{
  sender:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  content:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
}]
},{timestamps:true})

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;