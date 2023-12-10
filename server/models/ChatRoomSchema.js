const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const chatroomSchema = new mongoose.Schema({
    hostId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    messageBoxId:{
        type:String
    }
});

const Chatroom = mongoose.model("CHATROOM", chatroomSchema);

module.exports = Chatroom;