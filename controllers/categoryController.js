const {Category} = require('../models');
const {Product} = require('../models');
const {Image} = require('../models');


exports.createCategory = async (req,res) => {
    try{
        const {name} = req.body;
        await Category.create({name})
        res.status(201).json({message: "Category created!"})
    }catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}

exports.getAllCategories = async (req,res) => {
    try{
        const data = await Category.findAll({ include: { all: true, nested: true }})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}

exports.getCategoryById = async (req,res) => {
    try{
        const {id} = req.params;
        const data = await Category.findOne({where:{id},  include: { all: true, nested: true }});
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}

exports.updateCategory = async (req,res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        const data = await Category.update({name},{where:{id},order:[["id","ASC"]]})
        res.status(200).json({message: "Category updated!", data})
    }catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}


exports.deleteCategory = async (req,res) => {
    try{
        const {id} = req.params;
        await Category.destroy({where:{id}})
        const data = res.status(204).json({message: "Category deleted!"})
    }catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}