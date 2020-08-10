const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("Post");
const User = mongoose.model("users");
const requireLogIn = require('../middlewares/requireLogIn')

Router.get('/user/:id',requireLogIn,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate('postedBy','_id name')
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user:user,posts:posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"USer not found"})
    })
})

Router.put('/follow',requireLogIn,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true}).select('-password').then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})

Router.put('/unfollow',requireLogIn,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.user.unfollowId}
        },{new:true}).select('-password').then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})

Router.put('/updatepic',requireLogIn,(req,res)=>{
    User.findByIdAndUpdate(
        req.user._id
    ,{$set:{pic:req.body.pic}},{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:"Cannot Post pic"})
        }
        res.json(result)
    }
)})
module.exports = Router