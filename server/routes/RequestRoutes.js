const express = require("express");
const Router = express.Router();
const {makeBooking, razorCallback, verifyPayments} = require('../controllers/Request');

Router.post("/makeBooking/createOrder", makeBooking);
Router.post("/makeBooking/razor/callback", razorCallback);
Router.post("/razor/callback", verifyPayments);
const { isHost } = require("../middlewares/isHost");
const { isAdmin } = require("../middlewares/isAdmin");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const { getAllRequestsToHost } = require("../controllers/User");
const {
  acceptRequest,
  rejectRequest,
  changePrice,
} = require("../controllers/Host");

Router.post("/makeBooking/createOrder");
Router.post("/makeBooking/razor/callback");
Router.post("/razor/callback");
Router.get("/getAllRequestsToHost", isHost, getAllRequestsToHost);
Router.post("/acceptRequest", isHost, acceptRequest);
Router.post("/rejectRequest", isHost, rejectRequest);
Router.post("/changePrice", isHost, changePrice);


module.exports = Router;
