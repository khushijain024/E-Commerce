const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName : {type : String , required : true},
    productPrice : {type : Number,    required : true},
    productDesc : {type : String , required : true},
    productCategory : {type : String , required : true},
    productImage : {type : String , required : true},
    status : {type : Boolean , required : true},
    
});

module.exports = mongoose.model("Product",productSchema);