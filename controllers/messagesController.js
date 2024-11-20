const messageModel = require("../model/messagesModel.js")
const bcrypt = require("bcrypt")

module.exports.addMsg = async(req,res,next)=>{
 
try{
    const {from,to,message} = req.body;
    const data = await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from,

    })
    if(data){
        return res.json({msg:"mesage added successfully"});
    }
    else{
        return res.json({msg:"failed to send message"});
    }
}
catch(ex){
    next(ex);
}


}

module.exports.getMsg = async(req,res,next)=>{
    try{
        const {from,to} = req.body;
        
        const messages = await messageModel.find({
            users:{
                $all:[from,to],
            },

        }).sort({updatedAt:1})
        console.log(from);
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            }
        })
        res.json(projectedMessages);
    }
    catch(ex){
        next(ex);
    }

}

