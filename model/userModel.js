const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:5,
        max:20,
        unique:true
    },
    email:{
        type:String,
        max:50,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:"",
    },
})

module.exports = mongoose.model("User",userSchema)