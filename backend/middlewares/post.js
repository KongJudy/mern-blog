const multer = require('multer');
const path = require('path');
const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// STORES FILE INTO UPLOADS FOLDER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports.uploadMiddleware = multer({ storage }).single('file');

module.exports.verifiedUser = (req, res, next) => {
  const token = req.cookies.token;

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({
        status: false,
        message: 'Must be logged in to create a post',
        err
      });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;
        next();
      } else return res.json({ status: false });
    }
  });
};
