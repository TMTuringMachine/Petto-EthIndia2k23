const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  metamaskAddress: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  isHost: {
    type: Boolean,
  },
  isPending: {
    type: Boolean,
  },
  isDenied: {
    type: Boolean,
  },
  idProof: {
    type: String,
  },
  isIDProof: {
    type: Boolean,
  },
  profilePic: {
    type: String,
  },
  hostType: {
    type: String,
  },
  interest: {
    type: String,
  },
  hostImages: [
    {
      type: String,
    },
  ],
  stats: {
    totalEarnings: {
      type: Number,
      default: 0,
    },
    totalJobs: {
      type: Number,
      default: 0,
    },
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "POST",
    },
  ],
  hostRating: [
    {
      type: Schema.Types.ObjectId,
      ref: "RATING",
    },
  ],
  isAdmin: {
    type: Boolean,
  },
  hostBio: {
    type: String,
  },
  stats: {
    totalEarnings: {
      type: Number,
      default: 0,
    },
    totalJobs: {
      type: Number,
      default: 0,
    },
  },
  userRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "REQUEST",
    },
  ],
  location: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  messages: [
    {
      otherUser: { type: Schema.Types.ObjectId },
      messageBoxID: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
