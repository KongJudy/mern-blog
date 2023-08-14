const router = require('express').Router();
const { CreatePost, GetPosts } = require('../controllers/post');
const { uploadMiddleware } = require('../middlewares/post');
const { userVerification } = require('../middlewares/auth');

router.get('/', uploadMiddleware, GetPosts);
router.post('/create', userVerification, uploadMiddleware, CreatePost);

module.exports = router;
