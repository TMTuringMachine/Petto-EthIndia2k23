const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ratingSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    host:{
        type: Schema.Types.ObjectId,
        ref: "USER",
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "USER",
    }
    
});

const Rating = mongoose.model("RATING", ratingSchema);

module.exports = Rating;