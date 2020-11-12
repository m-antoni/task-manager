const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


router.get('/users/home', UserController.homePage);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getSingleUser);
router.put('/users/:id', UserController.updateUser);
router.put('/users/archive/:id', UserController.archiveUser);
router.get('/users/delete/all', UserController.deleteMany);

module.exports = router;