const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName :{
        type:String,
        required:true,
        trim:true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
   image:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("User", userSchema);
