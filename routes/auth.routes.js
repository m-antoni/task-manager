const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.get('/', AuthController.signInPage);
router.get('/sign-up', AuthController.signUpPage);

router.post('/api/users', AuthController.signInUser);
router.post('/api/users/create', AuthController.createUser);

module.exports = router;