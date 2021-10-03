const mongoose = require('mongoose'), Schema = mongoose.Schema;

const Categories = mongoose.Schema({
    names: [{type:String}],
    images: String,
});

module.exports = mongoose.model('Categorie', Categories);