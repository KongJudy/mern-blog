const router = require('express').Router();
const {
  CreatePost,
  GetPosts,
  GetSinglePost,
  EditPost,
  GetMyPosts
} = require('../controllers/post');
const { verifiedUser } = require('../middlewares/post');
const { uploadMiddleware } = require('../middlewares/post');

router.get('/', uploadMiddleware, GetPosts);
router.post('/create', verifiedUser, uploadMiddleware, CreatePost);
router.get('/:id', uploadMiddleware, GetSinglePost);
router.put('/edit/:id', verifiedUser, uploadMiddleware, EditPost);
router.get('/my-posts/:id', verifiedUser, GetMyPosts);

module.exports = router;
