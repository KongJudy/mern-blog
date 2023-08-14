const Post = require('../models/post');

module.exports.GetPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(404).json('Error getting post', err);
  }
};

module.exports.CreatePost = async (req, res) => {
  const { title, description, content } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    if (!title || !description || !content) {
      return res.json({
        status: false,
        message: 'Please fill out all the fields.'
      });
    }

    const post = new Post({
      title,
      description,
      file,
      content,
      author: req.user
    });
    await post.save();
    res.status(201).json({ status: true, message: 'Post sent!' });
  } catch (err) {
    console.error('Error creating post', err);
    res.status(404).json({ message: 'Error while creating the post.' });
  }
};
