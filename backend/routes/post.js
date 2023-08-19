const router = require('express').Router();
const { CreatePost, GetPosts, GetSinglePost } = require('../controllers/post');
const { verifiedUser } = require('../middlewares/post');
const { uploadMiddleware } = require('../middlewares/post');

router.get('/', uploadMiddleware, GetPosts);
router.post('/create', verifiedUser, uploadMiddleware, CreatePost);
router.get('/:id', uploadMiddleware, GetSinglePost);

module.exports = router;
