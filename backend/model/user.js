const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {type : String , required : true},
    lastName : {type : String },
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    contactNumber : {type : String , required : true},
    role : {type : String , required : true},
    status : {type : Boolean , required : true},
    userImage : {type : String , required  : true}
    
});

module.exports = mongoose.model("User",userSchema);