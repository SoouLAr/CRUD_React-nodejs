const express = require('express');
const Categorie = require('../model/Categorie');
const CategoryController=require('../controllers/categoryController')
const routes = express.Router()
const {upload}=require('../index')


//Get all the categories available
routes.get('/', CategoryController.getAllCategory)
routes.post('/addCategory',upload.single('image'),CategoryController.addCategory)
routes.get('/getCategory',CategoryController.findCategory)
routes.delete('/deleteCategory/:categoryID',CategoryController.deleteCategory)
routes.patch('/updateCategory/:categoryID',CategoryController.updateCategory)
routes.post('/addCategoryName/:categoryID',CategoryController.addCategoryName)

module.exports = routes