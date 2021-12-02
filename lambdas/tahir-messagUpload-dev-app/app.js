require("dotenv").config();
const Message = require('./messageModel')
const mongoose = require('mongoose')


exports.handler= async event =>{
await mongoose.connect(process.env.URI)
try {
  const reponse = await Message.create({
    email:event.pathParameters.email,
    message:event.pathParameters.message
  })
    return({
      statusCode:201,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body:JSON.stringify({message:"Message was saved!"})
    })
} catch (error) {
  return({
    statusCode:500,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body:JSON.stringify({message:"Message didn't deliver!"})
  })
}

}
