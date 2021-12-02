require("dotenv").config();
const Item = require("./modelItem");
const connection = require("./db");
const ObjectID = require("mongoose").Types.ObjectId;
// const Category = require('./modelCategory')

exports.updateItem = async (event) => {
  if(ObjectID.isValid(event.pathParameters.id)){
  try {
    const item = {
      name: event.pathParameters.name,
      price: event.pathParameters.price,
      unit: event.pathParameters.unit,
      category: event.pathParameters.category
    };
    await Item.findByIdAndUpdate(event.pathParameters.id,item,{new:true});
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({message:"Item changed succesfuly"})
    };
  } catch (error) {
    let errors={};
        Object.keys(error.errors).map((key)=>{
            errors[key]=error.errors[key].message
        })
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({
        message: errors
      }),
    };
  }}else{
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({message:"Coulndt find category with that id"})
    };
  }
};
