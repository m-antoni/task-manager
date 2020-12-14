const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/login', AuthController.loginPage);
router.get('/register', AuthController.registerPage);

// api
router.post('/login', AuthController.loginPost);
router.post('/register', AuthController.registerPost);
router.get('/logout', auth, AuthController.logOut);


module.exports = router;