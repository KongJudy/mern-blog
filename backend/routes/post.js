const router = require('express').Router();
const { CreatePost, GetPosts, GetSinglePost } = require('../controllers/post');
const { uploadMiddleware } = require('../middlewares/post');
const { verifiedUser } = require('../middlewares/post');

router.get('/', uploadMiddleware, GetPosts);
router.get('/:id', uploadMiddleware, GetSinglePost);
router.post('/create', verifiedUser, uploadMiddleware, CreatePost);

module.exports = router;
