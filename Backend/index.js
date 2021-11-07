require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer')

const uri = process.env.URI

const storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'./uploads')
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+file.originalname)
  }
})

const fileFilter = (req,file,cb)=>{
  console.log(file.mimetype);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') cb(null,true)
  else cb(null,false)
}

const upload = multer({storage:storage,limits:{fileSize:1024*1024*8},fileFilter:fileFilter})
// EXPORT THE UPLOAD MODULE
module.exports={upload}


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

app.use('/uploads',express.static('uploads'))
app.use(express.json())

const categorieRouters = require('./routes/categorieRoutes');
const itemRouters = require('./routes/itemRouters');
app.use('/category',categorieRouters);
app.use('/item',itemRouters)




const port = process.env.PORT;
app.listen(port,()=>console.log('server started!'));

