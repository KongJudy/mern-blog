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

module.exports.verifiedUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.json({
        status: false,
        message: 'Must be logged in to create a post'
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decodedToken.id);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.json({ status: false });
    }
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};
