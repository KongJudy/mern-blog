const { Register } = require('../controllers/AuthController');
const router = require('express').Router;

router.post('/register', Register);

module.exports = router;
