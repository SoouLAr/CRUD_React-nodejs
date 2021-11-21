const express = require('express');
const Item = require('../model/Items');
const Categories = require('../model/Categorie')
var ObjectId = require('mongoose').Types.ObjectId;


exports.getAll=async (req,res)=>{
    try {
        const allItems = await Item.find().populate("category").exec();
        if (allItems) {res.send(allItems)} else {res.send("No items found, would you like to add some?")}  
    } catch (error) {
        res.send(error)
    }
}

exports.addItem=async (req,res)=>{
    try{
             await Item.create({
                name: req.body.name,
                unit: req.body.unit,
                price: req.body.price,
                image: "https://tahir-bucket-images.s3.eu-south-1.amazonaws.com/1637271979471.png",
                category: req.body.category
                })
            res.send({
                status:201,
                message:"Item added succesfully"
            })
    }
    catch (error)  {
        let errors={};
        Object.keys(error.errors).map((key)=>{
            errors[key]=error.errors[key].message
        })
        res.status(400).send(errors)
}
}

exports.deleteItem=async (req,res)=>{
    try {
        if (!ObjectId.isValid(req.params.itemId)) {
                res.send("Please make sure the Item ID is valid")
            } else {
                await Item.findByIdAndDelete(req.params.itemId)
                res.send({
                    status:201,
                    message:"Item deleted succesfully"
                })
        }} 
    catch (error) {
        res.send(error)
    }
}

exports.deleteItemByCategory = async (req,res)=>{
    try{
        if (!ObjectId.isValid(req.params.categoryId)) {
            res.send("Please make sure the Category ID is valid")
        } else {
            await Item.deleteMany({category:req.params.categoryId})
            res.send({
                status:201,
                message:"Items were deleted succesfully"
            })
        }
    }catch(error){
        res.send(error)
    }
}

exports.updateItem=async (req,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        res.send("Please give a valid ID")
    } else{
    if (req.body.unit>0 && req.body.price>0 ){
        try {
            const repriceItem = await Item.findByIdAndUpdate(req.params.id,
                {   name:req.body.name,
                    unit:req.body.unit,
                    price:req.body.price,
                    image:req.body.image,
                    category:req.body.category  
                },
                {new:true})
            res.send(repriceItem)
        } 
        catch (error) {
            res.send(error)
                }
        } else {
            res.send("Make sure the quntity and price is grater than 1")
        }
    }
}

exports.getItemByCategory=async (req,res)=>{
    try {
        const allItems = await Item.find({category:req.params.categoryId});
        res.send(allItems)
    } catch (error) {
        res.send(error)
    }
}


exports.getItem= async (req,res)=>{
    try {
        const item= await Item.findById(req.params.id)
        if (!item) return res.send("No item found with this id")
        res.send(item)
    } catch (error) {
        res.send(error)
    }
}