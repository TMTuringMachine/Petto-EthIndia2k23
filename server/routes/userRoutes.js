const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  sendRequest,
  jwtVerify,
  getHostsNearMe,
  getAllRequest,
  createChat,
  isChatroomExist,
  getChat,
  updateUserMetamaskAddress,
} = require("../controllers/User");

const {
  createHost,
  getPendingHosts,
  getHost,
  approveHost,
  rejectHost,
  getAllHosts,
} = require("../controllers/Host");

const { createPost, likeAPI, getAllPosts } = require("../controllers/Post");

const { addReview } = require("../controllers/Review");

const { isHost } = require("../middlewares/isHost");
const { isAdmin } = require("../middlewares/isAdmin");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.post("/signup", signup);
router.get("/jwtVerify", jwtVerify);
router.post("/login", login);
router.post("/createHost", isHost, createHost);
router.get("/getPendingHosts", isAdmin, getPendingHosts);
router.get("/getHost/:id", getHost);
router.post("/approveHost", isAdmin, approveHost);
router.post("/rejectHost", isAdmin, rejectHost);
router.get("/getAllHosts", getAllHosts);
router.post("/sendRequest", isLoggedIn, sendRequest);
router.post("/rejectHost", isAdmin, rejectHost);
router.get("/getAllHosts", getAllHosts);
router.get("/getHostsNearMe/:latitude/:longitude", getHostsNearMe);
router.post("/addReview", addReview);
router.get("/getAllRequest/:id", getAllRequest);
router.post("/createChat", createChat);
router.post("/isChatroomExist", isChatroomExist);
router.get("/chatroom/:id", getChat);
router.post("/createPost", isLoggedIn, createPost);
router.post("/likeAPI", isLoggedIn, likeAPI);
router.get("/getAllPosts", getAllPosts);
router.post("/updateMetamaskAddress", updateUserMetamaskAddress);

module.exports = router;
