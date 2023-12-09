var jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Access Denied, No token provided');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const rootUser = await User.findById(decoded._id);
    if (rootUser) {
      req.user = rootUser;
      //   console.log(rootUser,"in the middleware!");
      next();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { isLoggedIn };
