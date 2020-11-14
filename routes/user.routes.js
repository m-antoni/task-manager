const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


router.get('/users/home', UserController.homePage);


router.get('/api/users', UserController.getUsers);
router.get('/api/users/:id', UserController.getSingleUser);
router.put('/api/users/:id', UserController.updateUser);
router.put('/api/users/archive/:id', UserController.archiveUser);
router.get('/api/users/delete/all', UserController.deleteMany);

module.exports = router;