const Item = require("./modelItem");
const Category = require("./modelCategory");
const Message = require("./messageModel");
const connection = require("./db");
const ObjectID = require("mongoose").Types.ObjectId;
const Object = require("mongodb").ObjectId;
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");

const poolData = {
  UserPoolId: process.env.POOL_ID,
  ClientId: process.env.CLIENT_ID,
};
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET,
  region: "eu-south-1",
});

const userPool = new CognitoUserPool(poolData);

const getAllItems = async () => {
  try {
    const allItems = await Item.find();
    if (allItems) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
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
    };
  }
};

const getAllCategories = async (event) => {
  try {
    const allCategories = await Category.find();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        categories: allCategories,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
const deleteItem = async (event) => {
  try {
    await Item.findByIdAndDelete(event.pathParameters.id);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Item deleted succesfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong!",
      }),
    };
  }
};

const deleteCategory = async (event) => {
  try {
    await Category.findByIdAndDelete(event.pathParameters.id);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Category deleted succesfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Something went wrong!",
      }),
    };
  }
};

const getItemsByCategory = async (event) => {
  try {
    if (ObjectID.isValid(event.pathParameters.id)) {
      const allItems = await Item.find({
        category: Object(event.pathParameters.id),
      });
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          body: allItems,
        }),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Make sure the ID is correct",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: error,
      }),
    };
  }
};

const addItem = async (event) => {
  const item = {
    name: event.pathParameters.name,
    image: event.queryStringParameters.url,
    price: event.pathParameters.price,
    unit: event.pathParameters.unit,
    category: event.pathParameters.category,
  };
  try {
    await Item.create(item);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Item added succesfuly", body: event }),
    };
  } catch (error) {
    let errors = {};
    Object.keys(error.errors).map((key) => {
      errors[key] = error.errors[key].message;
    });
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: errors,
      }),
    };
  }
};

const addCategory = async (event) => {
  const category = {
    name: event.pathParameters.name,
    image: event.queryStringParameters.url,
  };
  try {
    await Category.create(category);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Category created succesfully" }),
    };
  } catch (error) {
    let errors = {};
    Object.keys(error.errors).map((key) => {
      errors[key] = error.errors[key].message;
    });
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: errors,
      }),
    };
  }
};

const findItemById = async (event) => {
  try {
    if (ObjectID.isValid(event.pathParameters.id)) {
      const item = await Item.findById(event.pathParameters.id);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          body: item,
        }),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Make sure the ID is correct",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong!",
      }),
    };
  }
};
const updateItem = async (event) => {
  if (ObjectID.isValid(event.pathParameters.id)) {
    try {
      const item = {
        name: event.pathParameters.name,
        price: event.pathParameters.price,
        unit: event.pathParameters.unit,
        category: event.pathParameters.category,
      };
      await Item.findByIdAndUpdate(event.pathParameters.id, item, {
        new: true,
      });
      return {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({ message: "Item changed succesfuly" }),
      };
    } catch (error) {
      let errors = {};
      Object.keys(error.errors).map((key) => {
        errors[key] = error.errors[key].message;
      });
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: errors,
        }),
      };
    }
  } else {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Coulndt find category with that id" }),
    };
  }
};

let signUp = async (input) => {
  return new Promise((resolve, reject) => {
    let userAttributes = [];

    userAttributes.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: input.email,
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

const addUser = async (event) => {
  try {
    const response = await signUp(event.queryStringParameters);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    return {
      statusCode: 409,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};

const confirmCodePromise = async (input) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: input.username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(input.code, true, function (err) {
      if (err) {
        reject("Code didn't match!");
      } else {
        resolve("User confirmed");
      }
    });
  });
};

const confirmCode = async (event) => {
  try {
    const response = await confirmCodePromise(event.queryStringParameters);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    return {
      statusCode: 409,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};
const messageUpload = async (event) => {
  try {
    await Message.create({
      email: event.pathParameters.email,
      message: event.pathParameters.message,
    });
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Message was saved!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: "Message didn't deliver!" }),
    };
  }
};

const loginPromise = async (input) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: input.username,
        Password: input.password,
      });

    const userData = {
      Username: input.username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

const login = async (event) => {
  try {
    const response = await loginPromise(event.queryStringParameters);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    return {
      statusCode: 409,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};

const codeResendPool = async (input) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: input.username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err) => {
      if (err) {
        reject("No user was found!");
      }
      resolve("Check your email");
    });
  });
};

const resendCode = async (event) => {
  try {
    const response = await codeResendPool(event.queryStringParameters);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({ message: error }),
    };
  }
};

const getUploadUrl = async (event) => {
  const bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: Date.now() + "." + event.pathParameters.extentions,
    Expires: 60,
  };
  const uploadUrl = await s3.getSignedUrlPromise("putObject", bucketParams);
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ link: uploadUrl }),
  };
};
const uploadImage = async (event) => {
  const key = event.queryStringParameters.path;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ContentType: "multipart/form-data",
    ACL: "public-read",
    Expires: 120,
  };
  try {
    const preSigned = await s3.getSignedUrl("putObject", params);
    let returnObject = {
      statusCode: 201,
      header: {
        "acces-control-allow-origin": "*",
      },
      Body: JSON.stringify({
        fileUploadURL: preSigned,
      }),
    };
    return returnObject;
  } catch (error) {
    return {
      err: error.message,
      header: {
        "acces-control-allow-origin": "*",
      },
      body: JSON.stringify({ error: err }),
    };
  }
};


module.exports = {
  getAllItems,
  getAllCategories,
  deleteItem,
  deleteCategory,
  getItemsByCategory,
  addItem,
  addCategory,
  findItemById,
  updateItem,
  addUser,
  confirmCode,
  messageUpload,
  login,
  resendCode,
  getUploadUrl,
  uploadImage
};
