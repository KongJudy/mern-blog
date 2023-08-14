const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// CHECKING IF USER HAS ACCESS TO ROUTE BY MATCHING TOKEN
module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: 'Must be logged in' });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;
        res.json({ status: true, user: user.username });
        next();
      } else return res.json({ status: false });
    }
  });
};
