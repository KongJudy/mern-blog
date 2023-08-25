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
    console.log('Error creating post', err);
    res.status(404).json({ message: 'Error while creating the post.' });
  }
};

module.exports.GetSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePost = await Post.findById(id).populate('author');
    res.json(singlePost);
  } catch (err) {
    console.log(err);
  }
};

module.exports.EditPost = async (req, res) => {
  const { title, description, content } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.description = description;
    post.content = content;

    if (req.file) {
      post.file = req.file.filename;
    }

    await post.save();

    res.json({ status: true, message: 'Post Updated!' });
  } catch (err) {
    console.log('ERROR editing post', err);
    res.status(404).json({ message: 'Error editing post' });
  }
};

module.exports.GetMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ author: userId });

    res.json({ status: true, posts });
  } catch (err) {
    console.log('Error fetching user posts', err);
    res
      .status(404)
      .json({ status: false, message: 'Error fetching user posts' });
  }
};
