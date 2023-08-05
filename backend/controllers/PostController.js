const Post = require('../models/PostModel');

module.exports.GetPost = async (req, res) => {
  const post = await Post.find();
  res.json(post);
};

module.exports.CreatePost = async (req, res) => {
  const { title, description, content } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    const post = new Post({ title, description, file, content });
    await post.save();
    res.json('Success');
  } catch (err) {
    res.status(404).json('Error creating post', err);
  }
};
