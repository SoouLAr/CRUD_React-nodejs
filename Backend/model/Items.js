const Company = require('./Categorie');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const Item = mongoose.Schema({
    name:{
        type:String,
        required : [true,"Item must have a name"]
    },
    unit:{
        type:Number,
        min:[1,"Unit should be larger than 0"],
        required:[true,"Unit is required"]
    },
    price:{
        type:Number,
        min:[1,"Price should be larger than 0"],
        required:[true,"Price is required"]
    },
    image:{
        type:String,
        required:[true,"Must include image"],

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:'Categorie'
    }
});

module.exports = mongoose.model('Item', Item);