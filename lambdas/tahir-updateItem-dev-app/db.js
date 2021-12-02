require("dotenv").config();
const mongoose = require("mongoose");

const connect =  mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }).then(console.log("Connection succes"))
  .catch((err) => console.log(err.reason));

module.exports = connect;
