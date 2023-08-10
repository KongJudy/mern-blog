const multer = require('multer');
const path = require('path');

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
