require("dotenv").config();
const Item = require("./modelItem");
const connection = require("./db");

exports.getAllItems = async (event) => {
  try {
    const allItems = await Item.find();
    if (allItems) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({
          items: allItems,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No categories were found",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No categories were found",
      }),
    };l
  }
};
