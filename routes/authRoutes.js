const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/', AuthController.signInPage);
router.post('/', AuthController.signInUser);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.createUser);


module.exports = router;