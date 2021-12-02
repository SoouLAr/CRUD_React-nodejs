require("dotenv").config();
const Category = require('./modelCategory');
const connection = require("./db");

exports.getAllCategories = async (event) => {
  try {
    const allCategories = await Category.find();
    return({
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({
            categories:allCategories
        })
    })
  } catch (error) {
    console.log(error);
  }
};
