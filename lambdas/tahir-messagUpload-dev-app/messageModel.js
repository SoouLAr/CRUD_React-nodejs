const mongoose = require('mongoose')

const Message = mongoose.Schema({
    email:String,
    message:String
})

module.exports=mongoose.model("Message",Message)