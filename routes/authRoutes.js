const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

router.get('/', AuthController.signInPage);
router.post('/', AuthController.signInUser);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.createUser);
router.get('/sign-out/user', auth, AuthController.signOut);


module.exports = router;