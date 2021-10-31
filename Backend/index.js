const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const categorieRouters = require('./routes/categorieRoutes');
const itemRouters = require('./routes/itemRouters');



mongoose
  .connect('mongodb+srv://tao3:1234@cluster0.48kz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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


app.listen(5000,()=>console.log('server started!'));

exports.module=app;