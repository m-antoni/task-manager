const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/home', auth, taskController.homePage);
router.get('/home/tasks', taskController.tasksPage);
router.get('/home/create-task', taskController.createTaskPage);

// api
router.post('/home/create-task', taskController.createTask);


module.exports = router;