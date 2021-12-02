require("dotenv").config();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
  UserPoolId: process.env.POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

let signUp = async (input) => {
  return new Promise((resolve, reject) => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let userAttributes = [];

    userAttributes.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: input.email
      })
    );

    userPool.signUp(
      input.username,
      input.password,
      userAttributes,
      null,
      function (err, result) {
        if (err) {
          return reject({ code: 409, message: err });
        }
        return resolve({ code: 201, message: result });
      }
    );
  });
};

exports.handler = async (event) => {
  try {
    const response = await signUp(event.queryStringParameters);
    return {
      statusCode: 201,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
      body: JSON.stringify({ message: response }),
    }
  } catch (error) {
    return {
      statusCode: 409,
      headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
      body: JSON.stringify({ message: error }),
    }
  }
}
