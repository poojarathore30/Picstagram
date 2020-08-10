//requiring dependencies
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys');
const requireLogIn=require('../middlewares/requireLogIn');
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport');
const { Buffer } = require('buffer');
//sendgrid api key
const tranporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_keys:"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"
  }
}))
//sign up route
Router.post('/signup', (req, res) => {
  const { name, email, password,pic } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "please enter all required fields." });
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser) {
        return res.status(442).json({ error: "user already exists !with email" });
      }
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            name: name,
            password: hashedPassword,
            pic:pic
          })
          user.save().then(user => {
            tranporter.sendMail({
              to:user.email,
              from:'no-reply@instagramClone.com',
              subject:'sign up successfull',
              html:'<h1>Welcome to InstagramClone </h1><p>This app Wsa created By Pooja :)</p>'
            })
            res.json({ message: "saved succefully!" })
          })
            .catch(err => {
              console.log("error adding user");
            })
        })

    }).catch(err => {
      console.log(err);
    })
})
//sign in route
//status 422 : server has understood the request but cannot process it .
Router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "please add email or password !"
    })
  }
  User.findOne({ email: email }).then(savedUser => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password !!" })
    }
    bcrypt.compare(password, savedUser.password).then(doMatch => {
      if (doMatch) {
        //res.json("Succesfully signed in ");
        const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
        const {_id,name,email,followers,pic,following}=savedUser;
          res.json({token:token,user:{
            _id:_id,
            name:name,
            email:email,
            followers:followers,
            following:following,
            pic:pic
          }})
      }
      else {
        return res.json("Invalid Email or password ");
      }
    }).catch(err => {
      console.log(err);
    })
  })
})
//requireLOgIn will verify and authorize the user using a token if user tries to access protected data
// Router.get('/protected',requireLogIn,(req,res)=>{
//   res.send("hello user");
// })
Router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
    }
    const token=buffer.toString('hex')
    User.findOne({
      email:req.body.email
    }).then(user=>{
      if(!user){
        return res.status(422).json({error:'User does Not Exist'})
      }
      user.resetToken=token
      user.expireToken=Date.now()+3600000
      user.save().then((result=>{
        tranporter.sendMail({
          to:user.email,
          from:'no-reply@instaClone.com',
          subject:'password Reset',
          html:`
          <p>You REquested for password Reset</p>
          <h5>Click on this<a href="http://localhost:3000/reset-password/${token}"> link </a>to reset the password</h5>`
        })
        res.json({message:"Check Your Email"})
      }))
    
    })
  })
})

Router.post('/new-password',(req,res)=>{
  const NewPAssword=req.body.password
  const senttoken=req.body.token
  User.findOne({
    resetToken:senttoken
    ,
    expireToken:{$gt:Date.now()}
  }).then(user=>{
    if(!user){
      return res.status(422).json({error:"Session has Expired!! Try Again"})
    }
    bcrypt.hash(NewPAssword,12).then(hashedPassword=>{
      user.password=hashedPassword
      user.resetToken=undefined
      user.expireToken=undefined
      user.save().then(savedRecord=>{
        res.json({message:"PAssword Updated Succesfully"})
      })
    }).catch(err=>{
      console.log(err);
      
    })
  })
})
module.exports = Router;







