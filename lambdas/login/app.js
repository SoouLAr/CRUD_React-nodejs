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

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: input.username,
      Password: input.password
    })

    const userData = {
      Username: input.username,
      Pool: userPool
    };
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails,{
      onSuccess: result => {
        resolve ({
          accessToken:result.getAccessToken().getJwtToken(),
          idToken:result.getIdToken().getJwtToken(),
          refreshToken:result.getRefreshToken().getToken()
        })
      },
      onFailure: err =>{
        reject(err)
      }
    })
  })
}

exports.handler = async (event) => {
  try {
    const response = await login(event.queryStringParameters);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: response }),
    }
  } catch (error) {
    return {
      statusCode: 409,
      body: JSON.stringify({ message: error }),
    }
  }
}
