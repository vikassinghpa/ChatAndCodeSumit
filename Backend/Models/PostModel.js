const mongoose= require('mongoose');

let postSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    upload:{
      type:String,
      trim:true,
      
    },
    desc:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})
let Post=mongoose.model("Post",postSchema);
module.exports= Post;