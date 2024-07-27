const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    userId : {type : String , required : true},
    customerName : {type : String , required : true},
    customerContactNumber  : {type : String , required : true},
    address : {type : String , required : true},
    pinCode : {type  :  Number , require  : true},
    product : [{
    productName : {type : String , required : true},
        productPrice : {type : Number,    required : true},
        productDesc : {type : String , required : true},
        productCategory : {type : String , required : true},
        productImage : {type : String , required : true},
        quantity  : {type : Number , required : true},
        status: { type: String, default: 'pending' },
    }],
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order",productSchema);