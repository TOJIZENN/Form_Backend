const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://adi:BiHCXR6ua1aVfZuP@cluster0.7wwl83z.mongodb.net/new");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
});

mongoose.model("User",userSchema);
module.exports=mongoose.model("User");