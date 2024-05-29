const mongoose = require("mongoose");

let groupSchema=new  mongoose.Schema({
    friendId:[{
        type:mongoose.Types.ObjectId,
        ref:"Friend",
    }]
},{timestamps:true})
let Group= model.Schema("Group",groupSchema);
module.exports=Group;