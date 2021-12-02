require("dotenv").config();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
  UserPoolId: process.env.POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const confirmCode = async (input)=>{
  return new Promise((resolve,reject)=>{
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: input.username,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(input.code,true,function (err){
      if(err){
        reject("Code didn't match!")
      }else{
        resolve("User confirmed")
      }
    });
  })
}

exports.handler = async (event) => {
  try {
    const response = await confirmCode(event.queryStringParameters);
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
