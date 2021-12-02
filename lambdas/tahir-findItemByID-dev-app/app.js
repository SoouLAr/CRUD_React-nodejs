require("dotenv").config();
const Item = require("./modelItem");
// const Category = require('./modelCategory')
const connection = require("./db");
const ObjectID = require('mongoose').Types.ObjectId

exports.findItemByID = async (event) => {
  try {
    if (ObjectID.isValid(event.pathParameters.id)){
    const item = await Item.findById(event.pathParameters.id)
    return({
      statusCode:200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body:JSON.stringify({
        body:item
      })
    })} else {
      return ({
        statusCode:404,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body:JSON.stringify({
          message:"Make sure the is is correct"
        })
      })
    }
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({
        message: "Something went wrong!",
      }),
    };l
  }
};
