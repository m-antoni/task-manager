const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/', AuthController.signInPage);
router.get('/sign-up', AuthController.signUpPage);

// api
router.post('/', AuthController.signInUser);
router.post('/sign-up', AuthController.createUser);
router.get('/sign-out/user', auth, AuthController.signOut);

module.exports = router;