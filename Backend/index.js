require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');


const categorieRouters = require('./routes/categorieRoutes');
const itemRouters = require('./routes/itemRouters');

const uri = process.env.URI

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

const app =express()

app.use(cors({
  origin:"http://localhost:3000",
}));

app.use(express.json())
app.use('/category',categorieRouters);
app.use('/item',itemRouters)

const port = process.env.PORT;
app.listen(port,()=>console.log('server started!'));

exports.module=app;