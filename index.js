const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");


 
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes")
const msgRoutes = require("./routes/messagesRoutes")

app.use("/api/auth",userRoutes);
app.use("/api/messages",msgRoutes);


mongoose.connect(process.env.MONGO_URL, {
    
     
}).then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.error("DB connection error:", err);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`process started on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
});

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            console.log(data.message);
            socket.to(sendUserSocket).emit("msg-received",data.message)
        }
    })
})