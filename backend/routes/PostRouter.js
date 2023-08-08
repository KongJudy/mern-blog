const router = require('express').Router();
const { CreatePost, GetPosts } = require('../controllers/PostController');
const { uploadMiddleware } = require('../middlewares/PostMiddleware');

router.get('/posts', uploadMiddleware, GetPosts);
router.post('/create', uploadMiddleware, CreatePost);

module.exports = router;
