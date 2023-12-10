const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "USER",
  },
});

const Post = mongoose.model("POST", postSchema);

module.exports = Post;
