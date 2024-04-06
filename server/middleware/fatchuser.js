
var jwt = require('jsonwebtoken');
const JWT_SECRECT="AWAISMALIK";
const fatchuser=(req,res,next)=>{
const token=req.header('AUTH_TOKEN');

if(!token){
    res.status(401).send({error:"AUTHENIATE USING VALID TOKEN"});}
try {
    const data=jwt.verify(token,JWT_SECRECT);
    
    req.user=data.user;
    next();
    
} catch (error) {
   
    res.status(401).send({error:"AUTHENIATE USING VALID TOKEN"});}




}
module.exports=fatchuser;