const router = require('express').Router();
const { CreatePost, GetPosts } = require('../controllers/post');
const { uploadMiddleware } = require('../middlewares/post');
const { verifiedUser } = require('../middlewares/post');

router.get('/', uploadMiddleware, GetPosts);
router.post('/create', verifiedUser, uploadMiddleware, CreatePost);

module.exports = router;
