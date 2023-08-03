const User = require('../models/UserModel');
const { createSecretToken } = require('../utils/SecretToken');
const bcrypt = require('bcryptjs');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });

    if (existingEmail) {
      return res.json({ message: 'Email already exists!' });
    }
    if (existingUser) {
      return res.json({ message: 'Username already exists!' });
    }
    const user = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false
    });
    res
      .status(201)
      .json({ message: 'User signed in successfully', success: true, user });
    next();
  } catch (err) {
    console.log(err);
  }
};
