const express = require('express');
const Item = require('../model/Items')
const ItemController = require('../controllers/itemController')
const routes = express.Router()
const {upload}=require('../index')


//Get all items
routes.get('/',ItemController.getAll)

//Add a new Item
routes.post('/addItem',upload.single('image'),ItemController.addItem)

//Delete an item by a given ID
routes.delete('/deleteItem/:itemId',ItemController.deleteItem)

//Delete all item when category is deleted
routes.delete('/deleteItemsByCategory/:categoryId',ItemController.deleteItemByCategory)

//Reprice an item by a given id
routes.patch('/updateItem/:id',ItemController.updateItem)

// Get item of a specific category 
routes.get('/getItemByCategory/:categoryId',ItemController.getItemByCategory)

routes.get('/getItem/:id',ItemController.getItem)

module.exports=routes