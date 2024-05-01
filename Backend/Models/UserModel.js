const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    education: {
      type: mongoose.Types.ObjectId,
      ref: "Education",
      // autopopulate:true
    },
    phone: {
      type: Number,
      maxlength:10,
      minlength:10,
    },
    group: [{ type: mongoose.Types.ObjectId, ref: "Group",
    // autopopulate:true 
  }],

    post: [{ type: mongoose.Types.ObjectId, ref: "Post",
    // autopopulate:true
   }],

    friend: [{ type: mongoose.Types.ObjectId, ref: "User",
    // autopopulate:true 
  }],
   friendRequest:[{
    from:{
      type:mongoose.Types.ObjectId,
      ref:"User"
    },
    status:{
      type:String,
      enum:["pending","accepted","rejected"],
      default:"pending"
    }
   }],
    notification: [{ type: mongoose.Types.ObjectId, ref: "Notification",
    // autopopulate:true 
  }],
  },
  { timestamps: true }
);
// userSchema.plugin(require("mongoose-autopopulate"));
let User = mongoose.model("User", userSchema);
module.exports = User;