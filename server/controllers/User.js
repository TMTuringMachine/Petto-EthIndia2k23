const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Request = require("../models/RequestSchema");
const Chatroom = require("../models/ChatRoomSchema");

const signup = async (req, res) => {
  var { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword)
    res.status(422).send("Enter all fields");
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).send("User with this email already exists");
    } else if (password !== cpassword) {
      res.status(422).send("Passwords do not match");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const user = new User({ name, email, password });
      const saveUser = await user.save();
      if (saveUser) res.status(200).send("User created successfully");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(200)
        .send({ ok: false, message: "Email or password cannot be blank" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isValid = await bcrypt.compare(password, userLogin.password);
      if (!isValid) {
        res.status(200).json({ ok: false, message: "Incorrect Credentials" });
      } else {
        const token = jwt.sign(
          {
            _id: userLogin._id,
            name: userLogin.name,
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "14000000m",
          },
        );
        return res
          .status(200)
          .json({ ok: true, message: "Login Successfull!", token, userLogin });
      }
    } else {
      res.status(200).send({ ok: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const jwtVerify = async (req, res) => {
  const token = req.headers.authorization;
  console.log(`token: ${token}`);
  if (!token) {
    return res.send(null);
  }

  const decodeToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (decodeToken) {
    const user = await User.findById(decodeToken._id)
      .populate("userRequest")
      .populate({ path: "userRequest", populate: "hostId" });
    return res.send({ user });
  }
  res.send(null);
};

const sendRequest = async (req, res) => {
  const { hostId, title, description, Sdate, Stime, Edate, Etime, userId } =
    req.body;
  try {
    const from = { Sdate, Stime };
    const to = { Edate, Etime };
    const check = await Request.find({ title: title });
    console.log(check);
    if (!(check.length == 1)) {
      const newRequest = new Request({
        hostId,
        title,
        description,
        from,
        to,
        isPending: true,
        userId,
      });
      const result = await newRequest.save();
      if (result) {
        const user = await User.findById(req.user._id);
        console.log("user", user);
        var userRequest = [];
        console.log("user.UserRequest", user.userRequest);
        if (user.userRequest) {
          userRequest = user.userRequest;
        }
        userRequest.push({ _id: result._id });
        console.log("array", userRequest);
        const updateUser = await User.findByIdAndUpdate(req.user._id, {
          userRequest,
        });
        if (updateUser)
          res
            .status(200)
            .send({ ok: true, message: "Request Sent Successfully!" });
        console.log("here", updateUser);
      } else {
        res.status(200).send({ ok: false, message: "Request Already Exists" });
      }
    } else {
      res.status(200).send({ ok: false, message: "Bad Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllRequestsToHost = async (req, res) => {
  try {
    const data = await Request.find({ hostId: req.user._id }).populate(
      "userId",
    );
    if (data) res.status(200).send({ ok: true, message: "All requests", data });
  } catch (error) {}
};

const getHostsNearMe = async (req, res) => {
  const { longitude, latitude } = req.params;
  try {
    const AllHosts = await User.find({ isHost: true });
    let result = [];
    for (host of AllHosts) {
      const ans = getDistance(
        host.location.latitude,
        host.location.longitude,
        latitude,
        longitude,
      );
      const obj = { ans, host: host };
      result.push(obj);
    }

    res
      .status(200)
      .send({ ok: true, message: "All Hosts within range", result });
  } catch (error) {
    console.log(error);
  }
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log(d);
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const getAllRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const data = Request.find({ userId: id });
    if (data)
      res.status(200).send({ ok: true, message: "All Requests by me", data });
    else {
      res.status(200).send({ ok: false, message: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const isChatroomExist = async (req, res) => {
  const { hostId, userId } = req.body;
  const ifExist = await Chatroom.findOne({ hostId, userId });
  if (ifExist) {
    return res
      .status(200)
      .send({ ok: true, message: "chatroom already exist", chatroom: ifExist });
  } else {
    return res
      .status(200)
      .send({ ok: false, message: "chatroom does not exist" });
  }
};

const createChat = async (req, res) => {
  const { hostId, userId, messageBoxId } = req.body;

  const chatroom = new Chatroom({ hostId, userId, messageBoxId });
  await chatroom.save();
  return res
    .status(200)
    .send({ ok: true, message: "chatoom created", chatroom });
};

const getChat = async (req, res) => {
  const { id } = req.params;
  const chatroom = await Chatroom.findById(id);
  if (chatroom) {
    return res.send({ ok: true, message: "chatroom found", chatroom });
  }
  return res.send({ ok: false, message: "chatroom not found!" });
};

const updateUserMetamaskAddress = async (req, res) => {
  const { userid, address } = req.body;
  console.log(req.body, "this is it");
  if (!userid || !address) {
    console.log("i fucked here");
    return res.status(400).send({ message: "Insufficient data" });
  }
  const user = await User.findById(userid);
  if (!user) {
    console.log("i fucked here too");
    return res.status(400).send({ message: "Something went wrong" });
  }
  user.metamaskAddress = address;
  await user.save();
  return res
    .status(200)
    .send({ message: "Metamask address added successfully!" });
};

module.exports = {
  signup,
  login,
  jwtVerify,
  sendRequest,
  getAllRequestsToHost,
  getHostsNearMe,
  getAllRequest,
  createChat,
  isChatroomExist,
  getChat,
  updateUserMetamaskAddress,
};
