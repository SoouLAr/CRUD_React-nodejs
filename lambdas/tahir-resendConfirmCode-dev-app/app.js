require("dotenv").config();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
  UserPoolId: process.env.POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const login = async (input)=>{
  return new Promise((resolve,reject)=>{
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: input.username,
      Pool: userPool
    };
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err)=>{
        if(err){
          reject("No user was found!")
        }
        resolve("Check your email")
    })
  })
}

exports.handler = async (event) => {
  try {
    const response = await login(event.queryStringParameters);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: response }),
    }
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: error }),
    }
  }
}
