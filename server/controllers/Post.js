const User = require("../models/UserSchema");
const Request = require("../models/RequestSchema");
const Post = require("../models/PostSchema");
const { post } = require("../routes/UserRoutes");

const createPost = async(req,res)=>{
    const {image,caption} = req.body;
    try {
        const newPost = new Post({image,caption,author:req.user._id})
        const result = newPost.save();
        if(result) res.status(200).send({ ok: true, message: "Posted!" });
        else{
            res.status(200).send({ ok: false, message: "Error posting" });
        }
    } catch (error) {
        console.log(error)
    }
}

const likeAPI = async(req,res)=>{
    const {postId} = req.body;
    try {
        const getPost = await Post.findById(postId);
        let likes = getPost.likes;
        likes = likes + 1;
        const setLike = await Post.findByIdAndUpdate(postId,{likes})
        if(setLike) res.status(200).send({ ok: true, message: "Liked" });
        else{
            res.status(200).send({ ok: false, message: "No like" });
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllPosts = async(req,res)=>{
    try {
        const getAll = await Post.find().populate("author");
        if(getAll) res.status(200).send({ ok: true, message: "All posts",getAll });
        else{
            res.status(200).send({ ok: false, message: "Failed" });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createPost,
    likeAPI,
    getAllPosts
  };