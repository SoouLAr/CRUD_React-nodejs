require("dotenv").config();
const Item = require("./modelItem");
const connection = require("./db");
const ObjectID = require("mongoose").Types.ObjectId;
// const Object = require('mongodb').ObjectId

exports.addItem = async (event) => {
  try {
    const item = {
      name: event.pathParameters.name,
      image: event.queryStringParameters.url,
      price: event.pathParameters.price,
      unit: event.pathParameters.unit,
      category: event.pathParameters.category,
    };
    await Item.create(item);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({message:"Item added succesfuly"})
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
  }
};
