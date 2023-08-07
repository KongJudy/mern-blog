const Post = require('../models/PostModel');

module.exports.GetPost = async (req, res) => {
  const post = await Post.find();
  res.json(post);
};

module.exports.CreatePost = async (req, res) => {
  const { title, description, content } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    if (!title || !description || !content) {
      return res.json({ message: 'Please fill out all the fields.' });
    } else {
      const post = new Post({ title, description, file, content });
      await post.save();
      res.status(201).json({ message: 'Post sent!', success: true });
    }
  } catch (err) {
    res.status(404).json('Error creating post', err);
  }
};
