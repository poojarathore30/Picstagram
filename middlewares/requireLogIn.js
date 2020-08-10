// const jwt=require('jsonwebtoken');
// const {JWT_SECRET}=require('../config/keys');
// const mongoose=require('mongoose');
// const User=mongoose.model('users');
// module.exports=(req,res,next)=>{
// const {authorization}=req.headers;
// if(!authorization){
//     return res.status(401).json({error:"You must be Logged in !!"})
// }
// const token=authorization.replace("Bearer ","");
// jwt.verify(token,JWT_SECRET,(err,payload)=>{
//     if(err){
//        return res.status(401).json({error:"You must be Logged In!!"})
//     }
//     const {_id}=payload;
//     User.findById(_id).then(userData=>{
//         req.user=userData;
//         next()
//     })
// })
// }
// //status :401 means user not authorized