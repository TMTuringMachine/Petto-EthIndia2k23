const Razorpay = require("razorpay");
const Request = require("../models/RequestSchema");
const User = require("../models/UserSchema");
const Razor = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto module is node supported");
  console.log(err);
}

const makeBooking = async (req, res) => {
    const { price } = req.body;
    let options = {
        amount: price,
        currency: "INR",
        receipt: "order_receipt_0.1",
    };
    try {
        const razorRes = await Razor.orders.create(options);
        // console.log("razorRes:");
        // console.log(razorRes);
        return res.status(200).json({ ok: true, razorRes });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ ok: false, error });
    }
}

const razorCallback = (req, res) => {
    const webhookSecret = process.env.WEBHOOK_SECRET || "";
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    let razorSignature = req.headers["x-razorpay-signature"];
    if (razorSignature && digest === razorSignature) {
      return res.status(200).json({ ok: true, data: req.body });
    } else {
      return res.status(200).json({ ok: false });
    }
}

const verifyPayments = async (req, res) => {
    const razor_secret = process.env.WEBHOOK_SECRET;
    const { user_id, request_id, payment_id, order_id, razor_signature, amount } = req.body;
    console.log(req.body);
    const razor_ids = `${order_id} | ${payment_id}`;
    try {
      const generatedSignature = crypto
        .createHmac("sha256", razor_secret)
        .update(razor_ids.toString())
        .digest("hex");
  
      console.log(
        `generatedSignature: ${generatedSignature}, razor_signature: ${razor_signature}`
      );
      console.log(`Are they the same? ${generatedSignature === razor_signature}`);
      if (true) {
        console.log("here");
        const currentRequest = await Request.findById(request_id);
        console.log("currentRequest._id: ")
        console.log(currentRequest._id);
        console.log("currentRequest: ")
        console.log(currentRequest);
        console.log("printing id");
        console.log(currentRequest._id);
        let hostUser = await User.findById(currentRequest?.hostId);
        currentRequest.isPaymentDone = true;
        const newCurrentRequeset = await currentRequest.save();
        console.log(newCurrentRequeset);
        // const hostUser = await User.findById()
        await Request.findByIdAndUpdate(currentRequest._id, {isPaymentDone:true});
        // const hostUser = await Request
        let orderPayments 
        orderPayments = await Razor.payments.fetch(payment_id);
        console.log(`orderPayments: ${JSON.stringify(orderPayments)}`);

        let amountEarned = orderPayments?.amount - orderPayments?.amount_refunded || 0;
        amountEarned = (amountEarned)? amountEarned : amount; 
        newHost = {stats: {
          totalEarnings: hostUser.stats.totalEarnings + amountEarned,
          totalJobs: hostUser.stats.totalJobs + 1,
        }}
        hostUser = await User.findByIdAndUpdate(currentRequest?.hostId, newHost, {new: true});
        // hostUser.
        // let currentUser = await User.findById(user_id);
        // let enrolledCourse = {
        //   courseID: course_id,
        //   order_id,
        //   payment_id,
        //   payment_signature: razor_signature,
        // };
        // currentUser?.myEnrolledCourses.push(enrolledCourse);
        // const updatedUser = await User.findByIdAndUpdate(user_id, currentUser, {
        //   new: true,
        // });
        // return res.redirect("/dashboard");
        // console.log(JSON.stringify(updatedUser));
        return res.status(200).json({ ok: true, newHostUser: hostUser});
      }
      // throw new Error("not valid");
    } catch (error) {
      console.log(error);
      return res.redirect("/login");
    }
  };

module.exports = {makeBooking, razorCallback, verifyPayments };