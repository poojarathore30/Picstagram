//requiring dependencies
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("Post");
const requireLogIn = require('../middlewares/requireLogIn')
///router for user all posts
Router.get("/myposts", requireLogIn, (req, res) => {
    Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name").then(mypost => {
        res.json({ mypost: mypost })
    }).catch(err => {
        console.log(err);
    })
})

///router for liking then posts by user signed in
Router.put('/like', requireLogIn, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    },
        {
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json(result)
            }
        })
})
//router for unliking the post by user sighned in
Router.put('/unlike', requireLogIn, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    },
        {
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json(result)
            }
        })
})
//router for commenting on the post
Router.put('/comment', requireLogIn, (req, res) => {
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment}
    },
        {
            new:true
        })
        .populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json(result)
            }
        })
})
//router to delete a post 
Router.delete('/deletepost/:postId',requireLogIn,(req,res)=>{
    Post.findOne({
        _id:req.params.postId})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString()===req.user._id.toString()){
                post.remove()
                .then(result=>{
                  return  res.status(200).json(result)})
                .catch(err=>{console.log(err)
                })
            }
            })
})
//router to show all post created by the someone "profile page"
Router.get("/allposts", requireLogIn, (req, res) => {
    Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
        .then(posts => {
            res.json({ posts: posts })
        }).catch(err => {
            console.log(err);
        })
})
Router.get("/getsubpost", requireLogIn, (req, res) => {
    //if postedby in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
        .then(posts => {
            res.json({ posts: posts })
        }).catch(err => {
            console.log(err);
        })
})
// ////router to make a new post(+)
Router.post('/createPost', requireLogIn, (req, res) => {
    const { title, body, pic } = req.body;
    console.log(pic);
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "please add all the feeds." })
    }
    req.user.password = undefined;

    const post = new Post({
        title: title,
        body: body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    }).catch(err => {
        console.log(err);
    })
})
 module.exports = Router