var jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(200).send(token);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const rootUser = await User.findById(decoded._id);
    if (rootUser.isAdmin) {
      req.user = rootUser;
      next();
    } else {
      return res.status(401).send('Not admin');
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { isAdmin };
