require("dotenv").config();
const Item = require("./modelItem");
const connection = require("./db");
const ObjectID = require("mongoose").Types.ObjectId;
const Object = require('mongodb').ObjectId

exports.getItemByCategory = async (event) => {
  try {
    if (ObjectID.isValid(event.pathParameters.id)) {
      const allItems = await Item.find({ category: Object(event.pathParameters.id)});
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({
          body: allItems,
        })
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({
          message: "Make sure the is is correct",
        }),
      };
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
        message: event
      }),
    };
  }
};
