const { Register, Login } = require('../controllers/auth');
const { userVerification } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', userVerification);
router.post('/register', Register);
router.post('/login', Login);

module.exports = router;
