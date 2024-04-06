const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const fatchuser= require('../middleware/fatchuser')
const JWT_SECRECT="AWAISMALIK";
//ROUTE 1: FOR CRAETE A NEW USER 
router.post('/create',[
body('name',"Enter  A Valid Name").isLength({min:3}),
  body("email","Enter A Valid Email Address").isEmail(),
  body('password','Password Must be Atlast 5 Characters').isLength({min:5})
] ,async (req,res)=>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    
    return res.status(400).json({ error: errors.array() });
  }  
let user= await User.findOne({email:req.body.email})
if(user){
 return res.status(400).json({error:"ENTER THE VALID UNIQUE EMAIL ADDRESS"})

}
const salt=await bcrypt.genSalt(10);
const secPassword=await bcrypt.hash(req.body.password,salt)


 user =await User.create({
  name: req.body.name,
  password:secPassword,
  email:req.body.email
})
//.catch(err=>(console.log(err),
  //res.json({error:"PLEASE ENTER A UNIQUE EMAIL ADDRESS",message:err.message})));
const data={
  user:{
    id:user.id
  }
}

  const AuthTOKEN=jwt.sign(data,JWT_SECRECT)
res.send({"AUTHTOKEN":AuthTOKEN})
  //res.json(user)
}

);


//ROUTE 2:FOR LOGIN A USER THAT IS ALREAD EXIST
  
router.post('/login',[
    body("email","Enter A Valid Email Address").isEmail(),
    body('password','PASSWOR CANNOT BE BLANK').exists()
  ] ,async (req,res)=>{
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
  
const {email,password}=req.body;
let user=await User.findOne({email});
if(!user){
return res.status(500).send({success,error:"PLEASE TRY TO LOGIN WITH CORRECT EMAIL ADDRESS"});

}

const passwordCompare=await bcrypt.compare(password,user.password);
if(!passwordCompare){
  return res.status(500).send({success,error:"PLEASE TRY TO LOGIN WITH CORRECT EMAIL ADDRESS"});

}
try {
  
  const data={
    user:{
      id:user.id
    }
  }
  success=true  
  const AuthTOKEN=jwt.sign(data,JWT_SECRECT)
  res.send({success,"AUTHTOKEN":AuthTOKEN})
  //  console.log({"AUTHTOKEN":AuthTOKEN})

} catch (error) {
  console.log(error.message),
  res.json("SOME ERRORS OCCURED");

}})
//ROUTE 3:GET LOGINED IN USER DETAILS USING POST:"/api/auth/getuser " .LOGIN REQUIRED

router.post('/getuser',fatchuser ,async (req,res)=>{
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }      
  const userId=req.user.id;
  const user=await  User.findById(userId);
  res.send(user);
  
  
  
  })
    
    
    
    
    
module.exports=router
