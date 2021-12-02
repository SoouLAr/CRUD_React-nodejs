require("dotenv").config();
const fs = require("fs");
const AWS = require("aws-sdk");

const baseUrl= "https://tahir-bucket-images.s3.eu-south-1.amazonaws.com/"
const date = Date.now()

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
  region:"eu-south-1"
});


exports.handler= async event =>{
  const key = event.queryStringParameters.path
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: "multipart/form-data",
    Body: fileContent,
    ACL:"public-read",
    Expires: 120
  };
  try {
    const preSigned = await s3.getSignedUrl("putObject",params)
    let returnObject={
      statusCode:201,
      header:{
        "acces-control-allow-origin":"*"
      },
      Body:JSON.stringify({
        fileUploadURL: preSigned
      })
    }
    return returnObject
  } catch (error) {
    return({
      err:error.message,
      header:{
        "acces-control-allow-origin":"*"
      },
      body:"error occured"
    })
  }
}
