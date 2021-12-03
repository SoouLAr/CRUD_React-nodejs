const mongoose = require('mongoose'), Schema = mongoose.Schema;

const Categories = mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('Category', Categories);