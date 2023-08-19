const User = require('../models/user');
const { createSecretToken } = require('../utils/SecretToken');
const bcrypt = require('bcrypt');

// REGISTER
module.exports.Register = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });
    if (existingEmail) {
      return res.json({ message: 'Email already exists!' });
    }
    if (existingUser) {
      return res.json({ message: 'Username already exists!' });
    } else {
      const user = await User.create({ email, username, password, createdAt });
      const token = createSecretToken(user._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false
      });
      res.status(201).json({
        message: 'User signed in successfully',
        success: true,
        token
      });
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

// LOGIN
module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      res.json({ message: 'Username is required!' });
    }
    if (!password) {
      res.json({ message: 'Password is required!' });
    } else {
      const user = await User.findOne({ username });
      if (!user) {
        res.json({ message: 'Incorrect Username' });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        res.json({ message: 'Incorrect Password' });
      }
      const token = createSecretToken(user._id);
      delete user.password;
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false
      });
      res
        .status(201)
        .json({ message: 'Login Successful!', success: true, token });
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
