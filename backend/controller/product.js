const Product = require("../model/product")
const fs = require('fs');
const path = require('path');


exports.getAllProduct = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).send({message : "Products Fetched" , data : products});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.getProductById = async (req,res)=>{
    const { id } = req.params;
    try {
        const products = await Product.findById(id);
        res.status(200).send({message : "Product Fetched" , data : products});
    } catch (error) {
        res.status(500).send({message : "error" , error : error});
    }
}

exports.createProduct = async (req,res)=>{
    const { productName , productPrice , productDesc, productCategory  } = req.body;
    try {
        const productImage = req.file.path;
        const product = new Product({productName : productName , productPrice : productPrice , productDesc : productDesc, productCategory  : productCategory , status : true , productImage : productImage});
        console.log(product);
        await product.save();
        return res.status(201).send({message : "Product Created", data : product})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "error", error : error});
    }
}

exports.updateProduct = async (req,res)=>{
    const id = req.params.id;
    const reqBody = req.body;
    try {
        const existingProduct = await Product.findById(id);
        console.log("existingProduct: ", existingProduct);
        if(!existingProduct){
            return res.status(404).send({message : "Product not found"});
        }
        if (req.file) {
            // Delete the old image if it exists
            if (existingProduct.productImage) {
                const oldImagePath = path.join(__dirname, '..', existingProduct.productImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            
            // Add the new image path to reqBody
            reqBody.productImage = req.file.path;
        }
        console.log("req.file: ", req.file);
        const product = await Product.findByIdAndUpdate(id, reqBody,{new :true});
        console.log("product: ", product);

        res.status(202).send({message : "Product Updated",data : product});
    } catch (error) {
        console.log(error)
        res.status(500).send({message : "error"});
    }
}

exports.deleteProduct = async (req,res)=>{
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).send({message : "Product deleted",data : product});
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "error"})
    }
    
}
