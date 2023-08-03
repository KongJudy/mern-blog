const { Register, Login } = require('../controllers/AuthController');
const { userVerification } = require('../middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/', userVerification);
router.post('/register', Register);
router.post('/login', Login);

module.exports = router;
