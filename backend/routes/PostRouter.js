const router = require('express').Router();
const { CreatePost, GetPost } = require('../controllers/PostController');
const { uploadMiddleware } = require('../middlewares/PostMiddleware');

router.get('/', GetPost);
router.post('/create', uploadMiddleware, CreatePost);

module.exports = router;
