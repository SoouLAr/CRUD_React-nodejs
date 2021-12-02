require("dotenv").config();
const AWS = require("aws-sdk");


const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
  region:"eu-south-1"
});




exports.handler= async event =>{
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: Date.now()+"."+event.pathParameters.extentions,
    Expires:60
  };
   const uploadUrl = await s3.getSignedUrlPromise('putObject',params)

  return({
    statusCode:201,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body:JSON.stringify({link:uploadUrl})
  })
}
