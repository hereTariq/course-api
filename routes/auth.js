const router = require('express').Router();
const authContoller = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/signup', registerValidation, authContoller.register);
router.post('/login', loginValidation, authContoller.login);

module.exports = router;
