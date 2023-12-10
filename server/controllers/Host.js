const User = require("../models/UserSchema");
const Request = require("../models/RequestSchema");

const createHost = async (req, res) => {
  const {
    phone,
    gender,
    idProof,
    profilePic,
    hostType,
    interest,
    hostBio,
    latitude,
    longitude,
    hostImages,
  } = req.body;
  if (
    !phone ||
    !gender ||
    !idProof ||
    !profilePic ||
    !hostType ||
    !interest ||
    !hostBio
  )
    res.status(422).send("Enter all fields");
  const location = {
    latitude,
    longitude,
  };
  try {
    const userExists = await User.findOne({ _id: req.user._id });
    if (userExists && !req.user.isHost) {
      const updateDetails = await User.findByIdAndUpdate(req.user._id, {
        phone,
        gender,
        idProof,
        profilePic,
        hostType,
        interest,
        hostBio,
        isPending: true,
        location,
        hostImages,
      });
      if (updateDetails)
        return res.status(200).send({ ok: true, message: "Details Updated" });
    } else {
      return res
        .status(200)
        .send({ ok: false, message: "You are already a host" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const getPendingHosts = async (req, res) => {
  try {
    const allHosts = await User.find({ isPending: true });
    return res
      .status(200)
      .send({ ok: true, message: "All Pending Hosts", allHosts });
  } catch (error) {
    console.log(error);
  }
};

const getHost = async (req, res) => {
  const { id } = req.params;
  try {
    const currentHost = await User.findOne({ _id: id });
    if (currentHost.isHost)
      return res
        .status(200)
        .send({ ok: true, message: "Got Host", currentHost: currentHost });
    else {
      return res.status(200).send({ ok: false, message: "Not a Host" });
    }
  } catch (error) {
    console.log(error);
  }
};

const approveHost = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id, "here");
    const host = await User.findById(_id);
    if (host.isPending) {
      host.isPending = false;
      host.isHost = true;
      const approve = await host.save();
      // const approve = await User.findByIdAndUpdate(_id,{isHost:true,isPending:false});
      if (approve)
        return res.status(200).send({ ok: true, message: "Host Approved" });
    } else {
      return res.status(200).send({ ok: false, message: "Something is wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectHost = async (req, res) => {
  try {
    const { _id } = req.body;
    const host = await User.find({ _id });
    if (host[0].isPending) {
      const approve = await User.findByIdAndUpdate(_id, { isRejected: true });
      if (approve)
        return res.status(200).send({ ok: true, message: "Host Rejected" });
    } else {
      return res.status(200).send({ ok: false, message: "Something is wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllHosts = async (req, res) => {
  try {
    const hosts = await User.find({ isHost: true });
    if (hosts)
      return res.status(200).send({ ok: true, message: "All Hosts", hosts });
    else {
      return res.status(200).send({ ok: false, message: "Null" });
    }
  } catch (error) {
    console.log(error);
  }
};

const acceptRequest = async (req, res) => {
  const { reqId, total, rate } = req.body;
  const price = {
    total,
    rate,
  };
  try {
    const request = await Request.findByIdAndUpdate(reqId, {
      isApproved: true,
      price,
    });
    if (request)
      return res.status(200).send({ ok: true, message: "Request Approved!" });
    else {
      return res.status(200).send({ ok: false, message: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectRequest = async (req, res) => {
  const { reqId } = req.body;
  try {
    const request = await Request.findByIdAndUpdate(
      { _id: reqId },
      { isApproved: false, isPending: false }
    );
    if (request)
      return res.status(200).send({ ok: true, message: "Request Rejected" });
    else {
      return res.status(200).send({ ok: false, message: "Error" });
    }
  } catch (error) {
    console.log(error);
  }
};

const changePrice = async (req, res) => {
  const { reqId, rate, total } = req.body;
  const price = {
    total,
    rate,
  };
  try {
    const change = await Request.findByIdAndUpdate(reqId, { price });
    if (change) res.status(200).send({ ok: true, message: "Price Changed!" });
    else {
      res.status(200).send({ ok: false, message: "Error" });
    }
  } catch (error) {}
};

module.exports = {
  createHost,
  getPendingHosts,
  getHost,
  approveHost,
  rejectHost,
  getAllHosts,
  acceptRequest,
  rejectRequest,
  changePrice,
};
