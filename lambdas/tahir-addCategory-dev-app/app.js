require("dotenv").config();
// const Item = require("./modelItem");
const connection = require("./db");
const ObjectID = require("mongoose").Types.ObjectId;
// const Object = require('mongodb').ObjectId
const Category = require('./modelCategory')

exports.addCategory = async (event) => {
  try {
    const category = {
      name: event.pathParameters.name,
      image: event.queryStringParameters.url
    };
    await Category.create(category);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({message:"Category created succesfully"})
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
