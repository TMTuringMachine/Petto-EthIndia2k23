const User = require("../models/UserSchema");
const Request = require('../models/RequestSchema')
const Rating = require('../models/RatingSchema')

const addReview = async(req,res)=>{
    const {comment,rating,host,author,reqId} = req.body;
    try {
        const newReview = new Rating({comment,rating,host,author})
        const data = await newReview.save()
        if(data){ res.status(200).send({ ok: true, message: "Review Added", data });
        const reqSchema = await Request.findByIdAndUpdate({_id:reqId},{review:data._id});
        console.log("reqSchema",reqSchema)
        const data1 = req.user.hostRating.push({_id:data._id})
        console.log("data1",data1)
        console.log(hostRating)
        const userSchema = await User.findByIdAndUpdate({_id:req.user._id},{hostRating})
        consolr.log("userSchema",userSchema)
    }
        else{
            res.status(200).send({ ok: false, message: "Failed to add review" });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addReview
  };
  