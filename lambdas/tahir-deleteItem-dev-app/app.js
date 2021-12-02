require("dotenv").config();
const Item = require("./modelItem");
const connection = require("./db");

exports.deleteItem = async (event) => {
  try {
    await Item.findByIdAndDelete(event.pathParameters.id)
    return({
      statusCode:200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body:JSON.stringify({
        message:"Item deleted succesfully"
      })
    })
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
