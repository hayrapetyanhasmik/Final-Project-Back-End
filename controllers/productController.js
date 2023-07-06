const {Product, Category, Image} = require('../models');
const fs = require('fs');
const path = require('path');
const {prodValidSchema} = require('../prodValid');

exports.createProduct = async(req, res)=>{
    try{
        // const {error} = prodValidSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json({err: error.details[0].message});
        // }
        const {name,price,description,quantity,CategoryId} = req.body;
        const data = await Product.create({name,price,description,quantity,CategoryId})
        const img = req.files.map((file)=> { 
            return {
                filePath: file.filename,
                ProductId: data.id
            }
        });
        await Image.bulkCreate(img)
        res.status(201).json({message: "Product created!"})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong!"})
    } 
};

exports.getAllProducts = async(req,res)=>{
    try{
        const {page} = req.query;
        const limit = 8;
        const offset = (page-1)*limit;
        const data = await Product.findAll({ include:[{model:Category},{model:Image}], limit,offset});
        const totalCount = await Product.count();
        const totalPages = Math.ceil(totalCount/limit);
        res.status(200).json( {data, totalCount,totalPages})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}

exports.getAllProductsAdmin = async(req,res)=>{
    try{
        const data = await Product.findAll({ include:[{model:Category},{model:Image}]});
        res.status(200).json({message:"Success!", data})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}


exports.getProductById = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await Product.findOne({where:{id}, include: [
            { model: Image },
            { model: Category }
        ]})
        res.status(200).json(data) 
    }
    catch(err){
        res.status(500).json({message: "Something went wrong!"})
    }
}

exports.updateProduct = async(req,res)=>{
    const { id } = req.body;
    const { name, price, description, quantity, CategoryId } = req.body;

  try {
    const images = await Image.findAll({ where: { ProductId: id } });
    for (const image of images) {
    const filePath = path.join(__dirname, '..', 'static', 'images', image.filePath);
        fs.unlinkSync(filePath);
    }
    await Image.destroy({ where: { ProductId: id } });
    const img = req.files.map((file)=> { 
        return {
            filePath: file.filename,
            ProductId: id
        }
    });
    const newImage = await Image.bulkCreate(img);
    await Product.update({ name, price, description, quantity, CategoryId }, { where: { id } });
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
}


exports.deleteProduct = async (req, res)=> {
    const { id } = req.params;
    try {
        const images = await Image.findAll({ where: { ProductId: id } });
        for (const image of images) {
            const filename = path.join(__dirname, '..', 'static', 'images', image.filePath);
            fs.unlinkSync(filename);
        }
        await Image.destroy({ where: { ProductId: id } });
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: 'Product and associated images deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
  }


