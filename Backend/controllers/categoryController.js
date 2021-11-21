const express = require('express');
const Categorie = require('../model/Categorie');
var ObjectId = require('mongoose').Types.ObjectId;


exports.getAllCategory= async (req,res,cb)=>{
    cb(null, {"statusCode": 200, "body": "results"})
    try {
        const allCategories = await Categorie.find()
        allCategories ? res.send("allCategories") : res.send("There isnt a category , would you like to add one ?");
    } catch (error) {
        res.send("s")
    }
}

exports.addCategory= async (req,res)=>{
    try {
        if (!/[^a-zA-Z]+$/.test(req.body.names)) {
            const newCategorie = await Categorie.create({
                names: req.body.names, 
                images:"https://tahir-bucket-images.s3.eu-south-1.amazonaws.com/1637271979471.png"})
            res.send(newCategorie)
            }
        else {
            res.send("Name should not contain symbols and numbers")
        }}
     catch (error) {
        res.send(error);
    }
}

exports.findCategory = async (req,res)=>{
    try {
        const category = await Categorie.findOne({"names":req.body.name}).exec();
        if (category){res.send(category)} else {res.send("There is no category : "+req.body.name)}
    } catch (error) {
        res.send(error)
    }
}

exports.deleteCategory = async (req,res)=>{
    try {
        if (!ObjectId.isValid(req.params.categoryID)) {
            res.send("Please make sure the ID is correct.Id should be 24 char type")
        } else {
         if (Categorie) {
             await Categorie.findByIdAndDelete(req.params.categoryID)
             res.send("was succesfuly deleted")
            } else {
                res.send(req.params.categoryID+"don't exict")
            }
    }} catch (error) {res.send("No category with the given ID was found")}
}

exports.updateCategory = async (req,res)=>{
    try {
         const updatedCategorie =  await Categorie.findByIdAndUpdate(req.params.categoryID,{"names":req.body.newname},{"new":true})
         res.send(updatedCategorie)
        }
     catch (error) {
         res.send(error)
     }
}

exports.addCategoryName = async (req , res)=>{
    try {
        const updates = await Categorie.findByIdAndUpdate(req.params.categoryID,{$push:{"names":req.body.name}},{"new":true})
        res.send(updates)
    } catch (error) {
        res.send("We didnt find the category with the given ID")
    }
}
