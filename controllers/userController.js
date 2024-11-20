const User = require("../model/userModel.js")
const bcrypt = require("bcrypt")

module.exports.register = async(req,res,next)=>{
    try{const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({username});
    console.log(usernameCheck)
    if(usernameCheck){
        res.json({msg:"username already present",status:false})

    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        res.json({msg:"email already present",status:false})
    }
const hashedPassword = await bcrypt.hash(password,10);
const user = await User.create({
    username,email,password:hashedPassword
})
delete user.password;
return res.json({status:true,user})}

catch(ex){
    next(ex);
}
}

module.exports.login  = async(req,res,next)=>{
    try{const {username,password} = req.body;
    const user = await User.findOne({username});
    
    if(!user){
        res.json({msg:"Username not found",status:false})

    }
    const passMatch = bcrypt.compare(password,user.password)
    if(!passMatch){
        res.json({msg:"Incorrect Password",status:false})
    }

delete user.password;
return res.json({status:true,user})}

catch(ex){
    next(ex);
}
}

module.exports.setAvatar = async(req,res,next)=>{
    try{

        
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarSet:true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarSet,image:userData.avatarImage});
    }
    catch(ex){
        next(ex);
    }
}

module.exports.getAllUsers= async(req,res,next)=>{
     try{
        const users = await User.find({_id:{$ne:req.params.id}}).select(["email","username","avatarImage","_id"]);
        return(res.json(users));

     }
     catch(ex){
        next(ex);
     }
}