require("dotenv").config();
const Item = require("./modelItem");
const Category = require('./modelCategory')
const connection = require("./db");

exports.deleteCategory = async (event) => {
  try {
    await Category.findByIdAndDelete(event.pathParameters.id)
    return({
      statusCode:200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body:JSON.stringify({
        message:"Category deleted succesfully"
      })
    })
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Something went wrong!",
      }),
    };l
  }
};
