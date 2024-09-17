const express = require('express');
const app = express();
const usermodel=require('./user');
const cookieParser = require('cookie-parser');
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.post('/create',(req,res)=>{
let {username,email,password,age}=req.body;
bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(password,salt,async(err,hash)=>{
    let cr=await usermodel.create({username,email,password:hash,age});
    res.send(cr);
})
let token=jwt.sign({email},"gojo");
res.cookie("token",token);
});
})

app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.send("logged out");
}) 
app.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    let user=await usermodel.findOne({email});
    if(!user){
        return res.send("user not found");
    }  
    bcrypt.compare(password,user.password,function(err,result){
       if(result)
       {
        let token=jwt.sign({email:user.email},"gojo");
        res.cookie("token",token);
        res.send("you can login");
       }
        else
        {
            res.send("something is wrong");
        }
    })
});
app.listen(3000);
