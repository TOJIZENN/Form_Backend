const mongoose=require('mongoose');
mongoose.connect("your db string");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
});

mongoose.model("User",userSchema);
module.exports=mongoose.model("User");
