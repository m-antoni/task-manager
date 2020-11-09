const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getSingleUser);
router.put('/users/:id', UserController.updateUser);
router.put('/users/archive/:id', UserController.archiveUser);

module.exports = router;